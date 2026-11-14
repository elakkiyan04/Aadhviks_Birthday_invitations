"use client";

import React from "react";
import { motion } from "framer-motion";
import { BirthdayInvitationConfig } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { Heart } from "lucide-react";

interface ParentsSectionProps {
  config: BirthdayInvitationConfig;
}

export const ParentsSection: React.FC<ParentsSectionProps> = ({ config }) => {
  const { language, t } = useLanguage();

  const fatherName = config.fatherName[language];
  const motherName = config.motherName[language];

  return (
    <section className="relative py-8 px-4 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl p-6 sm:p-8 bg-peacock-blue/20 backdrop-blur-sm border border-antique-gold/25 shadow-sm text-center"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-1.5 text-antique-gold text-xs font-semibold uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 fill-antique-gold/30 text-antique-gold" />
            <span>{t.cordiallyInvitedBy}</span>
            <Heart className="w-3.5 h-3.5 fill-antique-gold/30 text-antique-gold" />
          </div>

          {/* Parents' Names */}
          <div className="py-1">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold gold-text-gradient tracking-wide">
              {fatherName} & {motherName}
            </h3>
            <p className="text-[11px] text-gold-light/75 tracking-wider uppercase mt-1">
              {t.father} & {t.mother}
            </p>
          </div>

          {/* Personal Heartfelt Message */}
          <p className="text-sm sm:text-base text-ivory-cream/85 leading-relaxed font-sans px-2">
            {config.parentsMessage[language]}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
