import React from "react";

interface PeacockFeatherProps {
  className?: string;
  size?: number;
  rotate?: number;
  withLotuses?: boolean;
}

export const PeacockFeather: React.FC<PeacockFeatherProps> = ({
  className = "",
  size = 64,
  rotate = 0,
  withLotuses = false,
}) => {
  return (
    <div
      className={`inline-block relative select-none transition-transform duration-500 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg
        width={size}
        height={size * (withLotuses ? 1.6 : 1.45)}
        viewBox="0 0 120 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-[0_4px_16px_rgba(213,174,97,0.2)]"
      >
        <defs>
          {/* Stem quill natural gradient */}
          <linearGradient id="naturalStem" x1="60" y1="165" x2="60" y2="25" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C4AF82" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#D9C79E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#EFE5CE" />
          </linearGradient>

          {/* Outer feathery halo */}
          <radialGradient id="outerHalo" cx="60" cy="55" r="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5E8B8A" stopOpacity="0.5" />
            <stop offset="65%" stopColor="#4A7574" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4A7574" stopOpacity="0" />
          </radialGradient>

          {/* Golden ochre eye mantle */}
          <radialGradient id="eyeOchre" cx="60" cy="55" r="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#DFCD99" />
            <stop offset="55%" stopColor="#BAA46A" />
            <stop offset="100%" stopColor="#8A7744" />
          </radialGradient>

          {/* Serene periwinkle / slate blue ring */}
          <radialGradient id="eyePeriwinkle" cx="60" cy="56" r="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A8C4DC" />
            <stop offset="60%" stopColor="#6C92B0" />
            <stop offset="100%" stopColor="#436B8A" />
          </radialGradient>

          {/* Deep midnight pupil */}
          <radialGradient id="eyePupil" cx="60" cy="58" r="9" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C2E4A" />
            <stop offset="80%" stopColor="#0E1A2C" />
            <stop offset="100%" stopColor="#08101C" />
          </radialGradient>
        </defs>

        {/* --- 1. Ethereal Outer Feather Barbs (Fine Wisps) --- */}
        <g stroke="#6B9695" strokeWidth="0.8" strokeLinecap="round" opacity="0.65">
          {/* Left top crown wisps */}
          <path d="M60 40 Q 50 20 45 10" />
          <path d="M60 45 Q 44 24 38 16" />
          <path d="M60 50 Q 38 32 30 25" />
          <path d="M60 55 Q 34 40 25 35" />
          <path d="M60 62 Q 32 48 22 46" />
          <path d="M60 70 Q 34 60 20 60" />
          <path d="M60 80 Q 38 72 24 75" />
          <path d="M60 90 Q 42 84 28 90" />
          <path d="M60 102 Q 46 98 32 105" />
          <path d="M60 115 Q 48 112 38 120" />
          <path d="M60 128 Q 50 126 44 135" />

          {/* Right top crown wisps */}
          <path d="M60 40 Q 70 20 75 10" />
          <path d="M60 45 Q 76 24 82 16" />
          <path d="M60 50 Q 82 32 90 25" />
          <path d="M60 55 Q 86 40 95 35" />
          <path d="M60 62 Q 88 48 98 46" />
          <path d="M60 70 Q 86 60 100 60" />
          <path d="M60 80 Q 82 72 96 75" />
          <path d="M60 90 Q 78 84 92 90" />
          <path d="M60 102 Q 74 98 88 105" />
          <path d="M60 115 Q 72 112 82 120" />
          <path d="M60 128 Q 70 126 76 135" />
        </g>

        {/* Secondary softer wisps for natural density */}
        <g stroke="#9CB5A0" strokeWidth="0.6" strokeLinecap="round" opacity="0.45">
          <path d="M60 48 Q 42 28 35 20" />
          <path d="M60 58 Q 36 44 26 42" />
          <path d="M60 68 Q 32 55 22 56" />
          <path d="M60 78 Q 36 68 24 70" />
          <path d="M60 88 Q 40 80 26 84" />
          <path d="M60 98 Q 44 92 30 100" />
          <path d="M60 110 Q 46 106 36 114" />

          <path d="M60 48 Q 78 28 85 20" />
          <path d="M60 58 Q 84 44 94 42" />
          <path d="M60 68 Q 88 55 98 56" />
          <path d="M60 78 Q 84 68 96 70" />
          <path d="M60 88 Q 80 80 94 84" />
          <path d="M60 98 Q 76 92 90 100" />
          <path d="M60 110 Q 74 106 84 114" />
        </g>

        {/* --- 2. Central Natural Quill / Stem --- */}
        <path
          d="M60 165 C 59.5 125, 59.8 70, 60 22"
          stroke="url(#naturalStem)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* --- 3. The Natural Peacock Eye (Ocellus) --- */}
        {/* Soft aura */}
        <circle cx="60" cy="55" r="28" fill="url(#outerHalo)" />

        {/* Teardrop outer halo contour */}
        <path
          d="M60 28 C 45 38, 40 54, 46 68 C 50 76, 56 80, 60 80 C 64 80, 70 76, 74 68 C 80 54, 75 38, 60 28 Z"
          fill="url(#eyeOchre)"
          opacity="0.9"
        />

        {/* Middle Periwinkle / Slate-Blue Ring */}
        <path
          d="M60 36 C 49 44, 46 56, 50 66 C 53 72, 57 74, 60 74 C 63 74, 67 72, 70 66 C 74 56, 71 44, 60 36 Z"
          fill="url(#eyePeriwinkle)"
        />

        {/* Inner Deep Midnight Blue / Indigo Pupil */}
        <ellipse cx="60" cy="58" rx="7.5" ry="9" fill="url(#eyePupil)" />

        {/* Serene soft highlight crescent */}
        <path
          d="M56 54 C 57 51, 63 51, 64 54"
          stroke="#DCEAF6"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* --- 4. Optional Base Embellishment (Blue Water-Color Lotuses & Mandala) --- */}
        {withLotuses && (
          <g transform="translate(0, 10)">
            {/* Left Soft Blue Lotus */}
            <g transform="translate(18, 115) scale(0.48)">
              <path d="M40 50 C 20 40, 10 20, 20 10 C 30 20, 35 40, 40 50 Z" fill="#88A8C5" opacity="0.8" />
              <path d="M40 50 C 60 40, 70 20, 60 10 C 50 20, 45 40, 40 50 Z" fill="#88A8C5" opacity="0.8" />
              <path d="M40 50 C 28 35, 25 15, 40 2 C 55 15, 52 35, 40 50 Z" fill="#A8C4DD" />
              <ellipse cx="40" cy="38" rx="8" ry="4" fill="#D6C492" opacity="0.9" />
            </g>

            {/* Right Soft Blue Lotus */}
            <g transform="translate(64, 115) scale(0.48)">
              <path d="M40 50 C 20 40, 10 20, 20 10 C 30 20, 35 40, 40 50 Z" fill="#88A8C5" opacity="0.8" />
              <path d="M40 50 C 60 40, 70 20, 60 10 C 50 20, 45 40, 40 50 Z" fill="#88A8C5" opacity="0.8" />
              <path d="M40 50 C 28 35, 25 15, 40 2 C 55 15, 52 35, 40 50 Z" fill="#A8C4DD" />
              <ellipse cx="40" cy="38" rx="8" ry="4" fill="#D6C492" opacity="0.9" />
            </g>

            {/* Bottom Fine Mandala Rosette */}
            <g transform="translate(60, 148)" stroke="#BFAF88" strokeWidth="0.8" opacity="0.85">
              <circle cx="0" cy="0" r="10" fill="none" strokeDasharray="1.5 1.5" />
              <circle cx="0" cy="0" r="6" fill="#F4EBD7" opacity="0.6" />
              <path d="M0 -9 L 2 -4 L 8 -2 L 3 1 L 4 7 L 0 4 L -4 7 L -3 1 L -8 -2 L -2 -4 Z" fill="none" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
