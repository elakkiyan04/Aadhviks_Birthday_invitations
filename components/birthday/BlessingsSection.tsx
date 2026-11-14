"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BirthdayInvitationConfig } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { Sparkles } from "lucide-react";

interface BlessingsSectionProps {
  config: BirthdayInvitationConfig;
}

export const BlessingsSection: React.FC<BlessingsSectionProps> = ({ config }) => {
  const { language, t } = useLanguage();

  return (
    <section className="relative py-12 px-4 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-peacock-blue/30 via-krishna-blue/40 to-deep-night/70 border border-antique-gold/25 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center space-y-5"
      >
        {/* Real Baby Krishna with Glowing Lotuses Illustration */}
        <div className="relative mx-auto w-36 h-48 sm:w-40 sm:h-52 -mt-2">
          <div className="relative w-full h-full drop-shadow-[0_8px_25px_rgba(213,174,97,0.35)]">
            <Image
              src="/images/krishna/krishna-lotus.png"
              alt="Baby Krishna with Lotuses"
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
        </div>

        {/* Section Heading */}
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-[0.25em] text-antique-gold font-semibold">
            {config.blessingTitle[language]}
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-ivory-cream">
            {t.blessingsTitle}
          </h3>
        </div>

        {/* Warm Heartfelt Krishna Blessings Quote */}
        <p className="text-sm sm:text-base font-serif italic text-gold-light/95 leading-relaxed px-2">
          “{config.blessingMessage[language]}”
        </p>

        <p className="text-xs sm:text-sm text-ivory-cream/75 font-sans leading-relaxed pt-1">
          {t.blessingQuote}
        </p>
      </motion.div>
    </section>
  );
};
