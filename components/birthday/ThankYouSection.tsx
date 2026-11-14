"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BirthdayInvitationConfig } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { Heart } from "lucide-react";

interface ThankYouSectionProps {
  config: BirthdayInvitationConfig;
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({ config }) => {
  const { language, t } = useLanguage();

  const babyName = config.babyName[language];
  const fatherName = config.fatherName[language];
  const motherName = config.motherName[language];

  return (
    <section className="relative py-12 px-4 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl p-6 sm:p-8 bg-peacock-blue/20 backdrop-blur-sm border border-antique-gold/25 shadow-sm text-center space-y-6"
      >
        {/* Playful Peeking Baby Krishna Artwork */}
        <div className="relative mx-auto w-32 h-44 sm:w-36 sm:h-48 -mt-2">
          <div className="relative w-full h-full drop-shadow-[0_8px_20px_rgba(213,174,97,0.3)]">
            <Image
              src="/images/krishna/krishna-peek.png"
              alt="Baby Krishna Peeking"
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-[0.25em] text-antique-gold font-semibold">
            {t.thankYouTitle}
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory-cream">
            {language === "ta" ? "மனமார்ந்த நன்றிகள்" : "With Sincere Gratitude"}
          </h3>
        </div>

        <p className="text-sm sm:text-base font-serif italic text-gold-light/95 leading-relaxed px-4">
          “{config.thankYouMessage[language]}”
        </p>

        {/* Names in Sign-off */}
        <div className="pt-3 pb-1 space-y-1 border-t border-antique-gold/20 max-w-xs mx-auto">
          <p className="text-[11px] text-antique-gold uppercase tracking-wider font-semibold">
            {t.warmRegards}
          </p>
          <h4 className="text-xl sm:text-2xl font-serif font-bold gold-text-gradient">
            {babyName}
          </h4>
          <p className="text-sm font-serif text-ivory-cream/80">
            {fatherName} & {motherName}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
