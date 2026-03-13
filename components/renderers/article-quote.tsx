"use client";

import { QuoteComponent } from "@/types";
import { Quote } from "lucide-react";

export default function ArticleQuote({ data }: { data: QuoteComponent }) {
  const { text, author, authorDescription, authorDates, cssClasses, quoteClasses } = data;

  return (
    <section className={`w-full py-16 md:py-24 px-6 ${cssClasses || ""}`}>
      <div className={`mx-auto relative bg-lotus-dark-blue/40 backdrop-blur-lg rounded-3xl p-10 md:p-16 border border-lotus-bronze/30 shadow-2xl overflow-hidden ${quoteClasses || ""}`}>

        {/* Large Decorative Quote Icon */}
        <Quote className="absolute -top-6 -left-6 w-32 h-32 text-lotus-bronze/10 z-0" />

        <div className="relative z-10 text-center">
          <p className="text-3xl md:text-5xl font-agr text-white leading-tight italic tracking-wide mb-10">
            "{text}"
          </p>

          <div className="flex flex-col items-center">
            <div className="h-px w-20 bg-lotus-bronze mb-6" />
            <span className="text-2xl font-bold text-lotus-bronze font-ret mb-2">
              {author}
            </span>
            {authorDescription && (
              <span className="text-lg text-white/60 font-ret italic mb-1">
                {authorDescription}
              </span>
            )}
            {authorDates && (
              <span className="text-sm tracking-widest text-white/40 uppercase font-ret">
                {authorDates}
              </span>
            )}
          </div>
        </div>

        {/* Small Decorative Elements */}
        <div className="absolute bottom-4 right-8 w-12 h-1 bg-lotus-bronze/40 rounded-full" />
      </div>
    </section>
  );
}
