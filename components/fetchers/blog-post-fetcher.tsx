import PostRenderer from "@/components/renderers/post-renderer"; 
import Paginator from "@/components/general/paginator"; 
import { StrapiArticle } from '@/types';
import { fetchArticles } from "@/services/articles";

export default async function BlogPostFetcher({ 
    currentPage = 1 
}: { 
    currentPage?: number 
}) {
    let blogPosts: StrapiArticle[] = [];
    let pagination = null;

    try {
        const response = await fetchArticles(currentPage, 2); // pageSize 2 per ora come da codice originale

        blogPosts = response.data || [];
        pagination = response.meta?.pagination || null;

    } catch (err) {
        console.error("Fetch error:", err);
        return <div className="text-white text-center py-10">Error loading posts.</div>;
    }

    if (blogPosts.length === 0) {
        return (
             <div className="w-full bg-amara-dark-blue py-10 padding-x">
                <p className="text-white text-center">No blog posts found.</p>
            </div>
        );
    }

    return (
        <div className="bg-amara-dark-blue flex flex-col gap-10 w-full pb-20">
            {/* Passiamo solo i post al Renderer */}
            <PostRenderer blogPosts={blogPosts} />
            
            {/* Il Paginator sta qui, sotto i post */}
            {pagination && <Paginator pagination={pagination} />}
        </div>
    );
}