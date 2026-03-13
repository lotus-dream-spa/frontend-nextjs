import 'server-only';
import { StrapiArticle, StrapiArticlesResponse } from '@/types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

const commonHeaders = {
  'Authorization': `Bearer ${STRAPI_TOKEN}`,
  'Content-Type': 'application/json',
};

/**
 * Fetches a list of articles with basic information for cards.
 */
export async function fetchArticles(page: number = 1, pageSize: number = 25): Promise<StrapiArticlesResponse> {
  const query = new URLSearchParams({
    'fields[0]': 'title',
    'fields[1]': 'caption',
    'fields[2]': 'slug',
    'populate[thumbnail][fields][0]': 'url',
    'populate[thumbnail][fields][1]': 'formats',
    'populate[article_tags][fields][0]': 'name',
    'populate[article_tags][fields][1]': 'description',
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'sort[0]': 'publishedAt:desc',
  });

  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?${query.toString()}`, {
      headers: commonHeaders,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Strapi error: ${res.statusText}`);
    }

    const json = await res.json();
    
    // Map article_tags to articleTags for frontend consistency
    if (json.data) {
      json.data = json.data.map((article: any) => ({
        ...article,
        articleTags: article.article_tags || []
      }));
    }

    return json as StrapiArticlesResponse;
  } catch (error) {
    console.error('Error fetching articles list from Strapi:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
  }
}

/**
 * Fetches a single article by slug with full content.
 */
export async function fetchArticleBySlug(slug: string): Promise<StrapiArticle | null> {
  if (!slug) return null;

  try {
    // 1. Fetch full article data using slug filter
    const query = new URLSearchParams({
      'filters[slug][$eq]': slug,
      'populate[thumbnail][populate]': '*',
      'populate[article_tags][populate]': '*',
      'populate[SEO][populate]': '*',
      'populate[Content][populate]': '*',
    });

    const res = await fetch(`${STRAPI_URL}/api/articles?${query.toString()}`, {
      headers: commonHeaders,
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Strapi fetch error: ${res.statusText}`);
    const json = await res.json();
    
    // In Strapi v5, filtering by slug on a collection endpoint returns an array in 'data'
    const article = json.data?.[0];

    if (!article) {
      console.warn(`No article found for slug: ${slug}`);
      return null;
    }

      // Normalization helper
      const normalizeMedia = (media: any, forceArray = false) => {
        if (!media) return forceArray ? [] : null;
        const array = Array.isArray(media) ? media : [media];
        return forceArray ? array : array[0];
      };

      // Map article_tags and content block fields for frontend consistency
      const mappedContent = (article.Content || []).map((block: any) => {
        // Map common snake_case fields to camelCase and normalize media
        const isHero = block.__component === "graphic-component.hero";
        
        return {
          ...block,
          // For Hero, we want an array of background images for the slider
          bgImage: normalizeMedia(block.bgImage || block.bg_image, isHero),
          image: normalizeMedia(block.image),
          imagePosition: block.imagePosition || block.image_position,
          isImportant: block.isImportant !== undefined ? block.isImportant : block.is_important,
          contentPosition: block.contentPosition || block.content_position,
          textPositioning: block.textPositioning || block.text_positioning,
          authorDescription: block.authorDescription || block.author_description,
          authorDates: block.authorDates || block.author_dates,
          bgImageMobile: normalizeMedia(block.bgImageMobile || block.bg_image_mobile),
          buttonLabel: block.buttonLabel || block.button_label,
          buttonLink: block.buttonLink || block.button_link,
          isExternal: block.isExternal !== undefined ? block.isExternal : block.is_external,
          cssClasses: block.cssClasses || block.css_classes,
          heroClasses: block.heroClasses || block.hero_classes,
          paragraphClasses: block.paragraphClasses || block.paragraph_classes,
          quoteClasses: block.quoteClasses || block.quote_classes,
          ctaClasses: block.ctaClasses || block.cta_classes,
        };
      });

      // Normalize root media
      const mappedSeo = (article.SEO || []).map((seo: any) => ({
        ...seo,
        ogImage: normalizeMedia(seo.ogImage || seo.og_image)
      }));

      return {
        ...article,
        thumbnail: normalizeMedia(article.thumbnail),
        articleTags: article.article_tags || [],
        SEO: mappedSeo,
        Content: mappedContent
      } as StrapiArticle;

    return null;
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}":`, error);
    return null;
  }
}
