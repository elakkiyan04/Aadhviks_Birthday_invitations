"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { BirthdayInvitationConfig } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { GoldenArch } from "../shared/GoldenArch";
import { CheckCircle2, Send, Users, AlertCircle, Heart } from "lucide-react";

interface RsvpSectionProps {
  config: BirthdayInvitationConfig;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ config }) => {
  const { language, t } = useLanguage();

  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(2);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Anti-spam trap

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  if (!config.rsvp.enabled) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent reject bot submissions

    const trimmedName = guestName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage(
        language === "ta"
          ? "தயவுசெய்து உங்கள் பெயரை பதிவு செய்யவும் (குறைந்தது 2 எழுத்துக்கள்)."
          : "Please enter your name (minimum 2 characters)."
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          birthdayId: config.id,
          guestName: trimmedName,
          attending,
          guestCount: attending ? Number(guestCount) || 1 : 0,
          message: message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMessage(result.error || "Submission error. Please try again.");
        setIsLoading(false);
        return;
      }

      setIsDemoMode(Boolean(result.isDemoMode));
      setIsSubmitted(true);
      setIsLoading(false);

      if (attending) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#D5AE61", "#174F68", "#287B70", "#FFF8E8"],
        });
      }
    } catch (err: any) {
      setErrorMessage(
        language === "ta"
          ? "தொழில்நுட்ப கோளாறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
          : "Network connection error. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <section id="rsvp-section" className="relative py-12 px-4 max-w-lg mx-auto">
      <GoldenArch className="space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-xs uppercase tracking-[0.25em] text-antique-gold font-semibold">
            RSVP
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory-cream">
            {t.rsvpTitle}
          </h3>
          <p className="text-xs sm:text-sm text-gold-light/80 max-w-xs mx-auto">
            {t.rsvpSubtitle}
          </p>
          {config.rsvp.deadline && (
            <p className="text-[11px] text-antique-gold/90 font-mono pt-1">
              {t.rsvpDeadlineNotice}: {config.rsvp.deadline}
            </p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 px-4 text-center space-y-4 rounded-2xl bg-peacock-blue/40 border border-antique-gold/40"
            >
              <div className="w-16 h-16 rounded-full bg-antique-gold/20 text-antique-gold border border-antique-gold/50 flex items-center justify-center mx-auto shadow-gold-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif font-bold text-ivory-cream">
                {t.rsvpSuccessTitle}
              </h4>
              <p className="text-sm text-ivory-cream/85 max-w-xs mx-auto leading-relaxed">
                {attending ? t.rsvpSuccessDesc : t.rsvpSuccessDescDecline}
              </p>

              {isDemoMode && (
                <div className="mt-4 px-3 py-1.5 rounded-lg bg-deep-night/60 border border-antique-gold/30 text-[11px] text-antique-gold font-mono inline-block">
                  {t.demoModeNotice}
                </div>
              )}
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Spam prevention trap (Hidden from normal humans) */}
              <input
                type="text"
                name="website_pot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Guest Name Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gold-light block">
                  {t.guestNameLabel} <span className="text-antique-gold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={t.guestNamePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-deep-night/85 border border-antique-gold/40 text-ivory-cream placeholder:text-ivory-cream/40 text-sm focus:outline-none focus:border-antique-gold focus:ring-1 focus:ring-antique-gold transition-all"
                />
              </div>

              {/* Attending Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gold-light block">
                  {t.attendingLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      attending
                        ? "bg-gradient-to-r from-antique-gold to-gold-dark text-deep-night border-gold-light shadow-md"
                        : "bg-deep-night/70 text-ivory-cream/70 border-antique-gold/30 hover:border-antique-gold"
                    }`}
                  >
                    {t.attendingYes}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      !attending
                        ? "bg-gradient-to-r from-antique-gold to-gold-dark text-deep-night border-gold-light shadow-md"
                        : "bg-deep-night/70 text-ivory-cream/70 border-antique-gold/30 hover:border-antique-gold"
                    }`}
                  >
                    {t.attendingNo}
                  </button>
                </div>
              </div>

              {/* Guest Count (Only visible if Attending is Yes) */}
              {attending && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gold-light flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-antique-gold" />
                    <span>{t.guestCountLabel}</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
                          guestCount === num
                            ? "bg-antique-gold text-deep-night border-gold-light shadow-sm"
                            : "bg-deep-night/80 text-ivory-cream/80 border-antique-gold/30 hover:border-antique-gold"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gold-light block">
                  {t.optionalMessageLabel}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.optionalMessagePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-deep-night/85 border border-antique-gold/40 text-ivory-cream placeholder:text-ivory-cream/40 text-sm focus:outline-none focus:border-antique-gold focus:ring-1 focus:ring-antique-gold transition-all resize-none"
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/50 flex items-center space-x-2 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-antique-gold via-gold-light to-gold-dark text-deep-night font-bold text-sm tracking-wide shadow-gold-glow hover:opacity-95 active:scale-98 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>{t.submittingRsvp}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.submitRsvp}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </AnimatePresence>
      </GoldenArch>
    </section>
  );
};

