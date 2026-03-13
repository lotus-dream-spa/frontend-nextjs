"use client";

import { ArticleContent } from "@/types";
import ArticleHero from "./article-hero";
import ArticleParagraph from "./article-paragraph";
import ArticleQuote from "./article-quote";
import ArticleCta from "./article-cta";

export default function ArticleRenderer({ content }: { content: ArticleContent[] }) {
  if (!content || content.length === 0) return null;

  return (
    <div className="w-full bg-lotus-blue flex flex-col">
      {content.map((block, index) => {
        const key = `${block.__component}-${block.id || index}`;
        
        switch (block.__component) {
          case "graphic-component.hero":
            return <ArticleHero key={key} data={block} />;
          
          case "text-components.paragraph":
            return <ArticleParagraph key={key} data={block} />;
          
          case "text-components.quote":
            return <ArticleQuote key={key} data={block} />;
          
          case "functional-components.cta":
            return <ArticleCta key={key} data={block} />;
          
          default:
            // @ts-ignore - Handle unexpected component types
            console.warn(`Unknown component: ${block?.__component || 'unknown'}`);
            return null;
        }
      })}
    </div>
  );
}
