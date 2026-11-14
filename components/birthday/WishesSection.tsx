"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BirthdayInvitationConfig, BirthdayWishRecord } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { GoldenDivider } from "../shared/GoldenBorder";
import { Heart, Sparkles, Send, MessageCircle } from "lucide-react";

interface WishesSectionProps {
  config: BirthdayInvitationConfig;
}

export const WishesSection: React.FC<WishesSectionProps> = ({ config }) => {
  const { language, t } = useLanguage();

  const [senderName, setSenderName] = useState("");
  const [wishText, setWishText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [wishesList, setWishesList] = useState<BirthdayWishRecord[]>([]);

  useEffect(() => {
    // Fetch initial approved wishes
    const loadWishes = async () => {
      try {
        const res = await fetch(`/api/wishes?birthdayId=${config.id}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data) setWishesList(json.data);
        }
      } catch (e) {
        console.warn("Could not load wishes:", e);
      }
    };
    if (config.wishes.enabled) {
      loadWishes();
    }
  }, [config.id, config.wishes.enabled]);

  if (!config.wishes.enabled) {
    return null;
  }

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !wishText.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          birthdayId: config.id,
          senderName: senderName.trim(),
          message: wishText.trim(),
        }),
      });

      if (res.ok) {
        setSuccessMsg(true);
        // Prepend optimistic wish
        const optimisticWish: BirthdayWishRecord = {
          id: `opt-${Date.now()}`,
          birthday_id: config.id,
          sender_name: senderName.trim(),
          message: wishText.trim(),
          created_at: new Date().toISOString(),
          approved: true,
        };
        setWishesList((prev) => [optimisticWish, ...prev]);
        setSenderName("");
        setWishText("");
        setTimeout(() => setSuccessMsg(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-10 px-4 max-w-lg mx-auto">
      <div className="rounded-3xl p-6 sm:p-8 bg-dark-card border border-antique-gold/35 shadow-gold-glow space-y-6">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 text-xs text-antique-gold font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.wishesTitle}</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory-cream">
            {language === "ta" ? "ஆசிகள் & நல்வாழ்த்துக்கள்" : "Blessing Wall"}
          </h3>
          <p className="text-xs sm:text-sm text-gold-light/80 max-w-xs mx-auto">
            {t.wishesSubtitle}
          </p>
        </div>

        <GoldenDivider variant="simple" />

        {/* Wish Submission Form */}
        <form onSubmit={handleWishSubmit} className="space-y-3.5 text-left">
          <div>
            <label className="text-xs font-semibold text-gold-light block mb-1">
              {t.senderNameLabel}
            </label>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={t.senderNamePlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-deep-night/85 border border-antique-gold/40 text-ivory-cream placeholder:text-ivory-cream/40 text-sm focus:outline-none focus:border-antique-gold"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gold-light block mb-1">
              {t.wishMessageLabel}
            </label>
            <textarea
              rows={2}
              required
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder={t.wishMessagePlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-deep-night/85 border border-antique-gold/40 text-ivory-cream placeholder:text-ivory-cream/40 text-sm focus:outline-none focus:border-antique-gold resize-none"
            />
          </div>

          {successMsg && (
            <div className="p-3 rounded-xl bg-peacock-green/40 border border-peacock-green text-xs text-gold-light text-center">
              ✨ {t.wishSuccess}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-xl bg-antique-gold/30 hover:bg-antique-gold text-gold-light hover:text-deep-night border border-antique-gold font-semibold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? t.sendingWish : t.sendWish}</span>
          </button>
        </form>

        {/* Existing Wishes Feed */}
        {wishesList.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-antique-gold/20 text-left">
            <h4 className="text-xs uppercase tracking-wider text-antique-gold font-semibold flex items-center space-x-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.recentWishesTitle}</span>
            </h4>
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {wishesList.map((wish) => (
                <div
                  key={wish.id}
                  className="p-3 rounded-xl bg-deep-night/70 border border-antique-gold/25 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-gold-light">
                      {wish.sender_name}
                    </span>
                    <Heart className="w-3 h-3 text-red-400 fill-red-400/40" />
                  </div>
                  <p className="text-xs text-ivory-cream/85 font-sans leading-relaxed">
                    “{wish.message}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

