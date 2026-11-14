"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BirthdayInvitationConfig, GalleryPhoto } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";

interface PhotoGallerySectionProps {
  config: BirthdayInvitationConfig;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ config }) => {
  const { language, t } = useLanguage();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const photos = config.babyGallery || [];

  const openLightbox = (index: number) => setActivePhotoIndex(index);
  const closeLightbox = () => setActivePhotoIndex(null);

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  return (
    <section className="relative py-14 px-4 max-w-lg mx-auto">
      <div className="text-center space-y-1.5 mb-8">
        <div className="inline-flex items-center space-x-1.5 text-xs text-antique-gold font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-antique-gold" />
          <span>{t.galleryTitle}</span>
          <Sparkles className="w-3.5 h-3.5 text-antique-gold" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory-cream">
          {language === "ta" ? "மழலைத் தருணங்கள்" : "Precious Little Steps"}
        </h3>
        <p className="text-xs sm:text-sm text-gold-light/80 font-sans max-w-xs mx-auto">
          {t.gallerySubtitle}
        </p>
      </div>

      {/* Grid Layout of Baby Photos - Preserving Portrait Proportions */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4 my-6">
        {photos.map((photo, index) => {
          const isFeatured = index === 0;
          return (
            <motion.div
              key={photo.id || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-antique-gold/30 shadow-md bg-krishna-blue/40 ${
                isFeatured ? "col-span-2 aspect-[4/5] sm:aspect-[16/11]" : "aspect-[3/4]"
              }`}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={photo.url}
                alt={photo.title ? photo.title[language] : `Milestone ${index + 1}`}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 220px, 340px"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-night/85 via-deep-night/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Milestone Tag */}
              {photo.monthTag && (
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-antique-gold/90 text-deep-night text-[10px] sm:text-[11px] font-bold shadow-sm">
                  {photo.monthTag}
                </div>
              )}

              {/* View Icon */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-deep-night/70 text-gold-light flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                <Eye className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Captions */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                {photo.title && (
                  <p className="text-xs sm:text-sm font-serif font-bold text-ivory-cream line-clamp-1">
                    {photo.title[language]}
                  </p>
                )}
                {photo.caption && (
                  <p className="text-[11px] text-gold-light/80 line-clamp-1 mt-0.5 font-sans">
                    {photo.caption[language]}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && photos[activePhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Photo Preview Container - Full Uncropped View */}
            <div className="relative w-full max-w-sm sm:max-w-md h-[60vh] max-h-[560px] rounded-2xl overflow-hidden border border-antique-gold/40 shadow-2xl bg-deep-night/80">
              <Image
                src={photos[activePhotoIndex].url}
                alt="Selected baby photo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>

            {/* Captions and Navigation Controls */}
            <div className="mt-4 text-center max-w-sm px-4 space-y-1">
              {photos[activePhotoIndex].monthTag && (
                <span className="text-[11px] uppercase tracking-widest text-antique-gold font-bold">
                  {photos[activePhotoIndex].monthTag}
                </span>
              )}
              {photos[activePhotoIndex].title && (
                <h4 className="text-base sm:text-lg font-serif font-bold text-ivory-cream">
                  {photos[activePhotoIndex].title![language]}
                </h4>
              )}
              {photos[activePhotoIndex].caption && (
                <p className="text-xs sm:text-sm text-gold-light/85">
                  {photos[activePhotoIndex].caption![language]}
                </p>
              )}
            </div>

            {/* Previous & Next Buttons */}
            <div className="flex items-center space-x-6 mt-4">
              <button
                type="button"
                onClick={prevPhoto}
                className="w-11 h-11 rounded-full bg-antique-gold/20 hover:bg-antique-gold text-gold-light hover:text-deep-night border border-antique-gold/50 flex items-center justify-center transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-ivory-cream/70 font-mono">
                {activePhotoIndex + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={nextPhoto}
                className="w-11 h-11 rounded-full bg-antique-gold/20 hover:bg-antique-gold text-gold-light hover:text-deep-night border border-antique-gold/50 flex items-center justify-center transition-all"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
