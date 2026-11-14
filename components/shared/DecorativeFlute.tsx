import React from "react";
import { PeacockFeather } from "./PeacockFeather";

interface DecorativeFluteProps {
  className?: string;
  width?: number;
  showFeather?: boolean;
}

export const DecorativeFlute: React.FC<DecorativeFluteProps> = ({
  className = "",
  width = 240,
  showFeather = true,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {showFeather && (
        <div className="absolute -top-10 left-12 z-0 transform -rotate-12 pointer-events-none">
          <PeacockFeather size={48} />
        </div>
      )}
      <svg
        width={width}
        height={width * 0.28}
        viewBox="0 0 320 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_4px_16px_rgba(213,174,97,0.45)]"
      >
        <defs>
          <linearGradient id="fluteGold" x1="20" y1="40" x2="300" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9C772F" />
            <stop offset="0.2" stopColor="#D5AE61" />
            <stop offset="0.45" stopColor="#FFF8E8" />
            <stop offset="0.75" stopColor="#D5AE61" />
            <stop offset="1" stopColor="#9C772F" />
          </linearGradient>
          <linearGradient id="fluteRing" x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F7E5B5" />
            <stop offset="1" stopColor="#9C772F" />
          </linearGradient>
        </defs>

        {/* Flute Main Tube */}
        <rect
          x="30"
          y="35"
          width="260"
          height="14"
          rx="7"
          fill="url(#fluteGold)"
          stroke="#9C772F"
          strokeWidth="1"
        />

        {/* Decorative Gold Rings along Flute */}
        <rect x="36" y="33" width="5" height="18" rx="2.5" fill="url(#fluteRing)" />
        <rect x="45" y="33" width="3" height="18" rx="1.5" fill="url(#fluteRing)" />
        <rect x="278" y="33" width="5" height="18" rx="2.5" fill="url(#fluteRing)" />
        <rect x="286" y="33" width="3" height="18" rx="1.5" fill="url(#fluteRing)" />

        {/* Flute Finger Holes */}
        <circle cx="95" cy="42" r="3.2" fill="#17345C" stroke="#D5AE61" strokeWidth="0.8" />
        <circle cx="125" cy="42" r="3.2" fill="#17345C" stroke="#D5AE61" strokeWidth="0.8" />
        <circle cx="155" cy="42" r="3.2" fill="#17345C" stroke="#D5AE61" strokeWidth="0.8" />
        <circle cx="185" cy="42" r="3.2" fill="#17345C" stroke="#D5AE61" strokeWidth="0.8" />
        <circle cx="215" cy="42" r="3.2" fill="#17345C" stroke="#D5AE61" strokeWidth="0.8" />
        <circle cx="245" cy="42" r="3.2" fill="#17345C" stroke="#D5AE61" strokeWidth="0.8" />

        {/* Mouthpiece blow hole */}
        <ellipse cx="65" cy="42" rx="4.5" ry="3" fill="#0B1D2D" stroke="#FFF3D6" strokeWidth="0.8" />

        {/* Hanging Silk Tassels & Pearls */}
        <path d="M280 47 Q 275 62 268 78" stroke="#D5AE61" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M285 47 Q 288 65 292 82" stroke="#D5AE61" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="268" cy="78" r="3" fill="#FFF8E8" stroke="#D5AE61" strokeWidth="1" />
        <circle cx="292" cy="82" r="3" fill="#FFF8E8" stroke="#D5AE61" strokeWidth="1" />
        <path d="M268 81 L 265 90 L 271 90 Z" fill="#287B70" />
        <path d="M292 85 L 289 94 L 295 94 Z" fill="#287B70" />

        {/* Divine Sparkles */}
        <polygon points="65,18 68,25 75,28 68,31 65,38 62,31 55,28 62,25" fill="#FFF8E8" opacity="0.9" />
        <polygon points="230,12 232,17 237,19 232,21 230,26 228,21 223,19 228,17" fill="#F7E5B5" opacity="0.8" />
      </svg>
    </div>
  );
};

