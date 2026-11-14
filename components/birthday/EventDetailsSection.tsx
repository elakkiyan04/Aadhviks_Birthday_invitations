"use client";

import React from "react";
import { motion } from "framer-motion";
import { BirthdayInvitationConfig } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { GoldenDivider } from "../shared/GoldenBorder";

interface EventDetailsSectionProps {
  config: BirthdayInvitationConfig;
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ config }) => {
  const { language, t } = useLanguage();

  const venueName = config.venueName[language];
  const address = config.address[language];

  // Format nice display date e.g. "Monday, 15 March 2027"
  const formattedDate = new Date(`${config.celebrationDate}T00:00:00`).toLocaleDateString(
    language === "ta" ? "ta-LK" : "en-GB",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const hasValidMapsUrl = Boolean(
    config.googleMapsUrl &&
      config.googleMapsUrl.startsWith("http") &&
      !config.googleMapsUrl.includes("undefined")
  );

  return (
    <section className="relative py-10 px-4 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-peacock-blue/60 via-krishna-blue/75 to-deep-night/95 border border-antique-gold/40 shadow-krishna-depth space-y-6"
      >
        <div className="text-center space-y-1">
          <span className="text-[11px] uppercase tracking-[0.25em] text-antique-gold font-semibold">
            {t.eventDetailsTitle}
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory-cream">
            {language === "ta" ? "விழா விபரங்கள்" : "When & Where"}
          </h3>
        </div>

        {/* Date & Time Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Date Card */}
          <div className="p-4 rounded-2xl bg-deep-night/80 border border-antique-gold/30 flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-antique-gold/20 flex items-center justify-center flex-shrink-0 text-antique-gold border border-antique-gold/40">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-antique-gold uppercase tracking-wider font-semibold block">
                {t.dateLabel}
              </span>
              <p className="text-sm font-semibold text-ivory-cream mt-0.5 capitalize">
                {formattedDate}
              </p>
              <p className="text-xs text-gold-light/75 font-serif mt-0.5">
                {config.celebrationDate}
              </p>
            </div>
          </div>

          {/* Time Card */}
          <div className="p-4 rounded-2xl bg-deep-night/80 border border-antique-gold/30 flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-antique-gold/20 flex items-center justify-center flex-shrink-0 text-antique-gold border border-antique-gold/40">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-antique-gold uppercase tracking-wider font-semibold block">
                {t.timeLabel}
              </span>
              <p className="text-sm font-semibold text-ivory-cream mt-0.5">
                {config.celebrationTime}
              </p>
              <p className="text-xs text-gold-light/75 font-serif mt-0.5">
                Asia/Colombo
              </p>
            </div>
          </div>
        </div>

        {/* Venue Card */}
        <div className="p-5 rounded-2xl bg-deep-night/80 border border-antique-gold/30 space-y-3">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-antique-gold/20 flex items-center justify-center flex-shrink-0 text-antique-gold border border-antique-gold/40">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-xs text-antique-gold uppercase tracking-wider font-semibold block">
                {t.venueLabel}
              </span>
              <h4 className="text-base sm:text-lg font-serif font-bold text-ivory-cream mt-0.5">
                {venueName}
              </h4>
              <p className="text-xs sm:text-sm text-ivory-cream/80 mt-1 leading-relaxed">
                {address}
              </p>
            </div>
          </div>

          {/* Google Maps External Button - Only visible if valid URL configured */}
          {hasValidMapsUrl && (
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-antique-gold to-gold-dark hover:from-gold-light hover:to-antique-gold text-deep-night font-semibold text-xs sm:text-sm shadow-md transition-all duration-300 transform active:scale-98"
            >
              <span>{t.viewOnGoogleMaps}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
};

