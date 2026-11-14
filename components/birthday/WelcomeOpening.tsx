"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BirthdayInvitationConfig } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { PeacockFeather } from "../shared/PeacockFeather";
import { ChevronDown, RotateCcw, Sparkles } from "lucide-react";

interface WelcomeOpeningProps {
  config: BirthdayInvitationConfig;
  onExploreClick?: () => void;
}

export const WelcomeOpening: React.FC<WelcomeOpeningProps> = ({ config, onExploreClick }) => {
  const { language, t } = useLanguage();
  const [stage, setStage] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Smooth cinematic timeline for Instagram Reel & mobile opening
  useEffect(() => {
    setStage(0);
    const timers = [
      setTimeout(() => setStage(1), 250),  // Stage 1: Golden aura & peacock feather sway
      setTimeout(() => setStage(2), 800),  // Stage 2: Baby Krishna portrait emerges softly
      setTimeout(() => setStage(3), 1600), // Stage 3: Baby name reveals with golden radiance
      setTimeout(() => setStage(4), 2400), // Stage 4: "You're Invited" & celebration details
      setTimeout(() => setStage(5), 3000), // Stage 5: Scroll invite
    ];

    return () => timers.forEach(clearTimeout);
  }, [animationKey]);

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const handleScrollDown = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const hero = document.getElementById("hero-section");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const babyName = config.babyName[language];
  const welcomeText = config.invitationWelcome[language];
  const openingImg = config.openingPhoto || "/images/first page.jpeg";

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between p-5 sm:p-8 bg-gradient-to-b from-[#0B1724] via-[#102A45] to-[#0B1724] overflow-hidden select-none">
      {/* Subtle Golden Vignette & Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(213,174,97,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Elegant Fine Golden Border Frame */}
      <div className="absolute inset-3 sm:inset-5 rounded-[2rem] border border-antique-gold/30 pointer-events-none z-20 shadow-[inset_0_0_30px_rgba(213,174,97,0.1)]">
        <div className="absolute top-2.5 left-2.5 text-antique-gold/50 text-[10px]">✤</div>
        <div className="absolute top-2.5 right-2.5 text-antique-gold/50 text-[10px]">✤</div>
        <div className="absolute bottom-2.5 left-2.5 text-antique-gold/50 text-[10px]">✤</div>
        <div className="absolute bottom-2.5 right-2.5 text-antique-gold/50 text-[10px]">✤</div>
      </div>

      {/* Top Bar: Brand Signature & Replay */}
      <div className="w-full flex items-center justify-between z-30 pt-1 px-2">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-antique-gold/75 font-serif font-semibold">
          Elora Moments
        </span>
        <button
          type="button"
          onClick={handleReplay}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-deep-night/60 border border-antique-gold/25 text-ivory-cream/70 hover:text-ivory-cream text-[11px] transition-colors active:scale-95"
          title={t.openingReplay}
        >
          <RotateCcw className="w-3 h-3 text-antique-gold" />
          <span className="hidden xs:inline">{t.openingReplay}</span>
        </button>
      </div>

      {/* Center Cinematic Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center max-w-sm sm:max-w-md my-auto py-2">
        {/* Soft Golden Light Radiance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={stage >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative -mb-1 z-10 pointer-events-none"
        >
          <div className="w-20 h-3 bg-antique-gold/25 rounded-full blur-md animate-pulse-glow" />
        </motion.div>

        {/* Real Baby Krishna Photo Reveal in Ornate Arch Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: "blur(8px)" }}
          animate={
            stage >= 2
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.88, filter: "blur(8px)" }
          }
          transition={{ duration: 1.1, ease: "easeOut" }}
          onClick={handleScrollDown}
          className="relative w-52 h-64 sm:w-60 sm:h-72 rounded-[2.5rem] p-1.5 bg-gradient-to-b from-antique-gold/80 via-antique-gold/30 to-antique-gold/60 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(213,174,97,0.25)] cursor-pointer group my-2 overflow-hidden"
        >
          <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-krishna-blue">
            <Image
              src={openingImg}
              alt={babyName}
              fill
              priority
              className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 640px) 240px, 280px"
            />
            {/* Subtle Vignette Gradient on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-night/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Opening Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-xs sm:text-sm font-serif italic text-gold-light/90 px-4 mt-2 max-w-xs"
        >
          “{welcomeText}”
        </motion.p>

        {/* Baby Name Reveal in Shimmering Gold */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={stage >= 3 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, type: "spring", bounce: 0.3 }}
          className="my-1.5"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-antique-gold/90 font-medium block mb-0.5">
            Baby Prince
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-wide gold-text-shimmer drop-shadow-[0_4px_16px_rgba(213,174,97,0.4)]">
            {babyName}
          </h1>
        </motion.div>

        {/* "You're Invited" & Celebration Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={stage >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-1 mt-1"
        >
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-antique-gold/15 border border-antique-gold/45 text-gold-light text-xs font-semibold tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3 h-3 text-antique-gold animate-spin-slow" />
            <span>{t.openingInvite}</span>
            <Sparkles className="w-3 h-3 text-antique-gold animate-spin-slow" />
          </div>
          <p className="text-xs sm:text-sm text-ivory-cream/85 font-medium line-clamp-1">
            {config.celebrationTitle[language]}
          </p>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={stage >= 5 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-20 flex flex-col items-center cursor-pointer group pb-1"
        onClick={handleScrollDown}
      >
        <span className="text-[11px] text-antique-gold/90 tracking-widest uppercase font-semibold group-hover:text-gold-light transition-colors">
          {t.openingTapToOpen}
        </span>
        <ChevronDown className="w-4 h-4 text-antique-gold animate-bounce mt-0.5" />
      </motion.div>
    </section>
  );
};
