"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BirthdayInvitationConfig } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { PeacockFeather } from "../shared/PeacockFeather";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  config: BirthdayInvitationConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const { language, t } = useLanguage();

  return (
    <section id="hero-section" className="relative py-14 sm:py-20 px-4 max-w-lg mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="space-y-6"
      >
        {/* Milestone Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-peacock-blue/50 border border-antique-gold/40 shadow-gold-glow">
          <Sparkles className="w-3.5 h-3.5 text-antique-gold animate-spin-slow" />
          <span className="text-xs sm:text-sm font-serif font-bold tracking-[0.2em] uppercase text-gold-light">
            {t.turnsOne}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-antique-gold animate-spin-slow" />
        </div>

        {/* Baby Photo Portrait - Preserving Aspect Ratio with Royal Arch Frame */}
        <div className="relative mx-auto w-64 sm:w-72 aspect-[9/14] my-5">
          {/* Subtle Decorative Peacock Feather at Top Left */}
          <div className="absolute -top-6 -left-6 z-20 pointer-events-none transform -rotate-12">
            <PeacockFeather size={52} />
          </div>

          {/* Outer Royal Golden Glow & Rim */}
          <div className="relative w-full h-full rounded-[2.5rem] p-1.5 bg-gradient-to-b from-antique-gold via-antique-gold/40 to-antique-gold/80 shadow-[0_16px_45px_rgba(0,0,0,0.7),0_0_35px_rgba(213,174,97,0.3)]">
            <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-krishna-blue border border-antique-gold/30">
              <Image
                src={config.babyProfilePhoto}
                alt={config.babyName[language]}
                fill
                priority
                className="object-cover object-top transform hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 640px) 280px, 320px"
              />
              {/* Soft bottom vignette so text stays legible if overlaid */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-night/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-antique-gold font-semibold">
                  Aadhvik • 1st Birthday
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Baby Name & Milestone Subtitle */}
        <div className="space-y-2 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold gold-text-gradient tracking-wide">
            {config.babyName[language]}
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-gold-light/90 max-w-sm mx-auto leading-relaxed">
            {config.heroTagline[language]}
          </p>
        </div>

        {/* Celebration Title Card - Clean & Minimal */}
        <div className="bg-peacock-blue/30 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-antique-gold/25 max-w-md mx-auto shadow-sm">
          <h3 className="text-base sm:text-lg font-serif font-semibold text-ivory-cream">
            {config.celebrationTitle[language]}
          </h3>
          <p className="text-xs sm:text-sm text-ivory-cream/70 mt-1 font-sans">
            {t.milestoneSubtitle}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
