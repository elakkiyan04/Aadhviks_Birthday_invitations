import React from "react";

interface ButterPotProps {
  className?: string;
  size?: number;
}

export const ButterPot: React.FC<ButterPotProps> = ({ className = "", size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-[0_6px_20px_rgba(213,174,97,0.3)] ${className}`}
    >
      <defs>
        <radialGradient id="potShade" cx="50" cy="70" r="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D5AE61" />
          <stop offset="0.6" stopColor="#9C772F" />
          <stop offset="1" stopColor="#5E3F10" />
        </radialGradient>
        <linearGradient id="butterWhite" x1="70" y1="20" x2="70" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.7" stopColor="#FFF8E8" />
          <stop offset="1" stopColor="#F7E5B5" />
        </linearGradient>
      </defs>

      {/* Main Earthen Pot Body */}
      <path
        d="M35 55 C 20 70, 20 110, 70 115 C 120 110, 120 70, 105 55 C 95 48, 85 45, 70 45 C 55 45, 45 48, 35 55 Z"
        fill="url(#potShade)"
        stroke="#D5AE61"
        strokeWidth="1.5"
      />

      {/* Pot Rim */}
      <ellipse cx="70" cy="46" rx="36" ry="10" fill="#9C772F" stroke="#F7E5B5" strokeWidth="1.5" />
      <ellipse cx="70" cy="44" rx="32" ry="7" fill="#5E3F10" />

      {/* Overflowing Butter Heap */}
      <path
        d="M42 43 C 45 28, 60 22, 70 22 C 80 22, 95 28, 98 43 C 94 48, 88 49, 82 46 C 76 43, 72 45, 66 48 C 60 49, 52 48, 48 45 C 44 43, 43 43, 42 43 Z"
        fill="url(#butterWhite)"
      />

      {/* Dripping Butter Dollops */}
      <path
        d="M60 48 C 60 56, 62 64, 65 68 C 68 70, 71 67, 70 60 C 69 54, 70 48, 70 48 Z"
        fill="url(#butterWhite)"
        opacity="0.95"
      />
      <circle cx="66" cy="74" r="3" fill="#FFF8E8" />

      {/* Ornate Golden Swag Garland on Pot */}
      <path
        d="M38 72 Q 70 92 102 72"
        stroke="#FFF8E8"
        strokeWidth="2"
        strokeDasharray="3 3"
        fill="none"
      />
      <circle cx="70" cy="85" r="4.5" fill="#D5AE61" stroke="#FFF8E8" strokeWidth="1" />
      <circle cx="53" cy="80" r="3.5" fill="#287B70" />
      <circle cx="87" cy="80" r="3.5" fill="#287B70" />

      {/* Base Foot */}
      <ellipse cx="70" cy="115" rx="22" ry="4" fill="#5E3F10" />
    </svg>
  );
};

