"use client";

import Image from "next/image";
import { HeroComponent, Image as StrapiImage } from "@/types";
import { getStrapiMedia } from "@/lib/client-utils/media";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

export default function ArticleHero({ data }: { data: HeroComponent }) {
  const { title, subtitle, bgImage, textPositioning } = data;
  
  // Ensure bgImage is always an array for the slider
  const images: StrapiImage[] = Array.isArray(bgImage) ? bgImage : bgImage ? [bgImage] : [];

  const positioningClass = 
    textPositioning === "bottom" ? "justify-end lg:pb-20" : "justify-center";

  return (
    <section className="relative w-full h-dvh flex flex-col items-center overflow-hidden bg-lotus-blue">
      {/* Background Slider */}
      {images.length > 0 && (
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={images.length > 1}
            className="w-full h-full"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={img.id || idx} className="w-full h-full">
                <Image
                  src={getStrapiMedia(img.url) || ""}
                  alt={img.alternativeText || title || "Hero Background"}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Elegant Overlay / Gradient */}
          {/* Main bottom-up gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-lotus-blue via-lotus-blue/40 to-transparent z-10 pointer-events-none" />
          
          {/* Corner-focused Vignette for WOW effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(11,26,45,0.8)_0%,_transparent_50%),_radial-gradient(circle_at_bottom_right,_rgba(11,26,45,0.8)_0%,_transparent_50%)] z-[11] pointer-events-none opacity-80" />
          
          <div className="absolute inset-0 bg-black/10 z-[5] pointer-events-none" />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-20 w-full h-full flex flex-col items-center px-6 text-center ${positioningClass}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <h1 className="text-4xl md:text-6xl font-agr text-white !leading-[inherit] drop-shadow-2xl uppercase">
            {title}
          </h1>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="lg:mt-8 mt-4 mb-4 text-xl md:text-2xl lg:font-ret text-lotus-gold/90 max-w-3xl mx-auto drop-shadow-lg italic"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator or bottom accent */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 opacity-50">
          <div className="w-[1px] h-20 bg-gradient-to-b from-lotus-gold to-transparent" />
      </div>
    </section>
  );
}
