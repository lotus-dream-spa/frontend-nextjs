"use client";

import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/client-utils/media";
import { StrapiArticle } from "@/types";

interface ArticleCardProps {
  post: StrapiArticle;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const thumbnailUrl = getStrapiMedia(post.thumbnail?.url || "");
  const altText = post.title || "Article image";

  return (
    <div className="w-full p-4">
      <div className="h-96 relative rounded-md border-4 border-white overflow-hidden group">
        
        {/* Background Image */}
        {thumbnailUrl ? (
          <Image 
            src={thumbnailUrl}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800 z-0" />
        )}

        {/* Overlay "Read Now" - Visible only on LG screens and above during hover */}
        <div className="absolute inset-0 bg-lotus-blue/70 backdrop-blur-sm opacity-0 lg:group-hover:opacity-100 transition-all duration-500 z-30 flex flex-col items-center p-8 pointer-events-none">
          {/* Read Now - Centered */}
          <div className="flex-grow flex items-center justify-center">
            <span className="bg-lotus-bronze text-lotus-blue font-agr text-2xl px-8 py-3 rounded-full shadow-2xl transform scale-90 lg:group-hover:scale-100 transition-transform duration-500">
              Read Now
            </span>
          </div>
          
          {/* Tags - Bottom of overlay */}
          {post.articleTags && post.articleTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-auto transform translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
              {post.articleTags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="border-2 border-lotus-light-gold text-lotus-light-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-black/20 backdrop-blur-md"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content Link */}
        <Link 
          href={`/blog/${post.slug}`}
          className="cursor-pointer w-full h-full flex flex-col justify-between relative z-20"
        >
          {/* --- TOP: TITLE --- */}
          <div className="flex flex-col items-start p-4">
            <div className="bg-lotus-dark-blue/70 backdrop-blur-sm rounded-sm px-4 py-2">
              <h4 className="text-xl xm:text-md sm:text-md leading-loose text-white font-bold font-agr uppercase line-clamp-2">
                {post.title}
              </h4>
            </div>
          </div>
          
          {/* --- BOTTOM: CAPTION --- */}
          <div className="flex flex-col grow justify-end items-start px-2 py-2">
            <div className="bg-lotus-dark-blue/70 backdrop-blur-sm rounded-sm px-4 py-3">
              <p className="text-xl xm:text-lg sm:text-lg tracking-tight text-lotus-bronze line-clamp-2 italic font-ret">
                {post.caption}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
