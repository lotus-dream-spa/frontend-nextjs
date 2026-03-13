import { StrapiArticle } from "@/types";
import ArticleCard from "./article-card";

interface PostRendererProps {
    blogPosts: StrapiArticle[];
}

export default function PostRenderer({ blogPosts }: PostRendererProps) {

    if (!blogPosts || blogPosts.length === 0) {
        return (
            <div className="w-full bg-amara-dark-blue py-10 padding-x">
                <p className="text-white text-center">Nothing to see here yet, but check back soon for updates!</p>
            </div>
        );
    }

    return (
        <div id="blog" className="w-full">
            <div className="w-full">
                <div className="grid grid-cols-2 xm:grid-cols-1 sm:grid-cols-1 gap-x-4">
                    {blogPosts.map((post) => (
                        <ArticleCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}