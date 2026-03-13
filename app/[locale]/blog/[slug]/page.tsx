import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchArticleBySlug } from "@/services/articles";
import ArticleRenderer from "@/components/renderers/article-renderer";
import { getStrapiMedia } from "@/lib/client-utils/media";
import Link from "next/link";
import Footer from "@/components/general/footer";

interface Props {
  params: {
    locale: string;
    slug: string;
  };
}

/**
 * Generates SEO metadata dynamically based on Strapi data.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Lotus Dream Spa",
    };
  }

  const seo = article.SEO && article.SEO.length > 0 ? article.SEO[0] : null;
  const ogImage = seo?.ogImage?.url ? getStrapiMedia(seo.ogImage.url) : getStrapiMedia(article.thumbnail?.url);

  return {
    title: seo?.metaTitle || `${article.title} | Lotus Dream Spa`,
    description: seo?.metaDescription || article.caption,
    keywords: seo?.keywords || "lotus dream spa, benessere, massage, luxury spa",
    openGraph: {
      title: seo?.ogTitle || article.title,
      description: seo?.ogDescription || article.caption,
      type: (seo?.ogType as any) || "article",
      images: ogImage ? [{ url: ogImage }] : [],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

/**
 * Article Page Component
 */
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
    <main className="min-h-screen bg-lotus-blue flex flex-col">
      {/* Navigation / Back Button */}


      {/* Article Content */}
      <article className="w-full flex-grow">
        <ArticleRenderer content={article.Content || []} />
      </article>

      {/* Footer-like note (Optional) */}
    </main>
      <Footer />
  </>
  );
}