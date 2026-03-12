"use client";

import Image from "next/image";
import Link from "next/link";
import { CtaComponent } from "@/types";
import { getStrapiMedia } from "@/lib/client-utils/media";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ArticleCta({ data }: { data: CtaComponent }) {
  const { title, caption, contentPosition, bgImage } = data;
  const imageUrl = getStrapiMedia(bgImage?.url || null);

  const getPositionClass = () => {
    switch (contentPosition) {
      case "left": return "items-start text-left";
      case "right": return "items-end text-right";
      default: return "items-center text-center";
    }
  };

  return (
    <section className="w-full py-12 md:py-16 lg:px-6">
      <div className="lg:max-w-7xl w-full mx-auto min-h-[500px] md:h-[400px] relative lg:rounded-3xl overflow-hidden group shadow-2xl lg:border lg:border-white/10">
        {/* Background Image */}
        {imageUrl ? (
          <div className="absolute inset-0 z-0">
             <Image
              src={imageUrl}
              alt={title || "CTA Background"}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/60 md:bg-black/50 backdrop-blur-[2px]" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-lotus-blue" />
        )}

        {/* Content */}
        <div className={`relative z-10 w-full h-full flex flex-col justify-center p-8 md:p-20 ${getPositionClass()}`}>
          <h2 className="text-3xl md:text-6xl font-agr text-white mb-6 leading-tight max-w-3xl">
            {title}
          </h2>
          {caption && (
            <p className="text-lg md:text-2xl font-ret text-white/80 mb-10 max-w-2xl">
              {caption}
            </p>
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/treatments"
              className="inline-flex items-center gap-4 bg-lotus-bronze hover:bg-lotus-light-gold text-lotus-blue font-bold px-10 py-5 rounded-full text-xl transition-all duration-300 shadow-xl"
            >
              Explore Now
              <MoveRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>

        {/* Animated Glow on Hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-lotus-bronze/20 to-lotus-rosewood/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-5" />
      </div>
    </section>
  );
}
