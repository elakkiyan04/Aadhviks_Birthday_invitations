"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BirthdayInvitationConfig } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { Clock, Sparkles } from "lucide-react";

interface CountdownSectionProps {
  config: BirthdayInvitationConfig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ config }) => {
  const { language, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
    isPast: false,
  });

  useEffect(() => {
    // Parse target date & time in Asia/Colombo (UTC+05:30)
    // celebrationDate: YYYY-MM-DD, celebrationTime: "5:00 PM"
    const targetISO = `${config.celebrationDate}T17:00:00+05:30`;
    const targetTime = new Date(targetISO).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        // Event day check: within 6 hours of event start
        if (Math.abs(difference) < 6 * 60 * 60 * 1000) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true, isPast: false });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false, isPast: true });
        }
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
        isLive: false,
        isPast: false,
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [config.celebrationDate, config.celebrationTime]);

  const units = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.minutes, value: timeLeft.minutes },
    { label: t.seconds, value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-8 px-4 max-w-lg mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-6 sm:p-8 bg-dark-card border border-antique-gold/35 shadow-gold-glow space-y-6"
      >
        <div className="flex items-center justify-center space-x-2 text-antique-gold">
          <Clock className="w-4 h-4 animate-spin-slow" />
          <h3 className="text-sm uppercase tracking-[0.2em] font-semibold">
            {t.countdownTitle}
          </h3>
        </div>

        {timeLeft.isLive ? (
          <div className="py-4 px-6 rounded-2xl bg-antique-gold/20 border border-antique-gold text-gold-light animate-pulse font-serif text-lg font-bold">
            🎉 {t.eventHappeningNow}
          </div>
        ) : timeLeft.isPast ? (
          <div className="py-4 px-6 rounded-2xl bg-peacock-blue/40 border border-antique-gold/30 text-gold-light font-serif text-base">
            ✨ {t.eventCompleted}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {units.map((unit, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-deep-night/80 border border-antique-gold/30 shadow-inner"
              >
                <span className="text-2xl sm:text-3xl font-serif font-black gold-text-gradient">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs text-ivory-cream/70 uppercase tracking-wider font-semibold mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="inline-flex items-center space-x-1.5 text-xs text-gold-light/80">
          <Sparkles className="w-3.5 h-3.5 text-antique-gold" />
          <span>Asia/Colombo Timezone (Sri Lanka)</span>
        </div>
      </motion.div>
    </section>
  );
};

