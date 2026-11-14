"use client";

import React from "react";
import { BirthdayInvitationConfig } from "@/types/birthday";
import { useLanguage } from "../shared/LanguageContext";
import { Share2 } from "lucide-react";

interface ShareSectionProps {
  config: BirthdayInvitationConfig;
}

export const ShareAndCalendarSection: React.FC<ShareSectionProps> = ({ config }) => {
  const { language, t } = useLanguage();

  const babyName = config.babyName[language];
  const venue = config.venueName[language];
  const address = config.address[language];

  // Compose WhatsApp share message
  const origin = typeof window !== "undefined" ? window.location.origin : "https://eloramoments.com";
  const invitationUrl = `${origin}/birthday/${config.slug}`;

  const shareText =
    language === "ta"
      ? `🎉 ${babyName} அவர்களின் முதலாவது பிறந்தநாள் விழா!\n\n📅 திகதி: ${config.celebrationDate} (${config.celebrationTime})\n📍 மண்டபம்: ${venue}, ${address}\n\nஅன்போடு அழைக்கிறோம்! அழைப்பிதழை காண:\n${invitationUrl}`
      : `🎉 You are cordially invited to ${babyName}'s First Birthday Celebration!\n\n📅 Date: ${config.celebrationDate} at ${config.celebrationTime}\n📍 Venue: ${venue}, ${address}\n\nPlease view our digital invitation:\n${invitationUrl}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <section className="relative py-8 px-4 max-w-lg mx-auto">
      {/* WhatsApp Share Card Only - No Calendar / Save the Date */}
      <div className="p-5 rounded-2xl bg-peacock-blue/30 border border-antique-gold/25 text-center space-y-3 shadow-sm backdrop-blur-sm">
        <h4 className="text-sm font-serif font-bold text-ivory-cream flex items-center justify-center space-x-2">
          <Share2 className="w-4 h-4 text-antique-gold" />
          <span>{t.shareTitle}</span>
        </h4>
        <p className="text-xs text-ivory-cream/75 max-w-xs mx-auto">
          {t.shareSubtitle}
        </p>
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
        >
          <span>💬</span>
          <span>{t.shareOnWhatsapp}</span>
        </a>
      </div>
    </section>
  );
};
