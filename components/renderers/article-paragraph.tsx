"use client";

import Image from "next/image";
import { ParagraphComponent } from "@/types";
import { getStrapiMedia } from "@/lib/client-utils/media";
import ReactMarkdown from "react-markdown";

export default function ArticleParagraph({ data }: { data: ParagraphComponent }) {
  const { text, image, imagePosition, isImportant, cssClasses, paragraphClasses } = data;
  const imageUrl = getStrapiMedia(image?.url || null);

  const isVertical = imagePosition === "up" || imagePosition === "down";
  const isReverse = imagePosition === "right" || imagePosition === "down";

  // Container layout logic
  const flexClass = isVertical
    ? `flex-col ${isReverse ? "flex-col-reverse" : ""}`
    : `lg:flex-row ${isReverse ? "lg:flex-row-reverse" : ""} flex-col`;

  return (
    <section className={`w-full py-12 md:py-20 max-w-7xl mx-auto ${isImportant ? "lg:px-6" : "px-6 "} ${cssClasses || ""}`}>
      <div className={`w-full ${isImportant ? "bg-lotus-dark-blue/40 backdrop-blur-md p-8 md:p-12 lg:rounded-[2.5rem] border border-white/10 shadow-2xl" : ""} ${paragraphClasses || ""}`}>
        <div className={`flex gap-10 md:gap-16 items-center ${flexClass}`}>

          {/* Text Column */}
          <div className="flex-1 w-full prose prose-invert prose-lg md:prose-xl max-w-none">
            <ReactMarkdown
              components={{
                h3: ({ children }) => (
                  <h3 className="font-agr text-3xl md:text-5xl text-lotus-bronze mb-8 mt-0 uppercase tracking-wider">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className={`${isImportant ? "font-ret italic" : ""} text-white/90 leading-relaxed mb-6 last:mb-0 text-lg md:text-2xl`}>
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-lotus-light-gold font-bold">
                    {children}
                  </strong>
                ),
              }}
            >
              {text}
            </ReactMarkdown>
          </div>

          {/* Image Column */}
          {imageUrl && (
            <div className={`flex-1 w-full ${isVertical ? "max-w-4xl mx-auto" : ""}`}>
              <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl group">
                <Image
                  src={imageUrl}
                  alt="Article illustrative image"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
