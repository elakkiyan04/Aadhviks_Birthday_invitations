import React from "react";

interface BabyKrishnaIllustrationProps {
  className?: string;
  size?: number;
}

export const BabyKrishnaIllustration: React.FC<BabyKrishnaIllustrationProps> = ({
  className = "",
  size = 280,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Outer Divine Halo Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-antique-gold/25 via-sky-blue/20 to-antique-gold/25 blur-2xl animate-pulse-glow" />

      <svg
        width={size}
        height={size}
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_12px_28px_rgba(213,174,97,0.35)]"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="krishnaHalo" cx="160" cy="150" r="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF8E8" stopOpacity="0.8" />
            <stop offset="0.35" stopColor="#F7E5B5" stopOpacity="0.5" />
            <stop offset="0.75" stopColor="#D5AE61" stopOpacity="0.25" />
            <stop offset="1" stopColor="#174F68" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skinTone" x1="160" y1="90" x2="160" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BEE3F8" />
            <stop offset="0.4" stopColor="#90CDF4" />
            <stop offset="0.8" stopColor="#63B3ED" />
            <stop offset="1" stopColor="#3182CE" />
          </linearGradient>
          <linearGradient id="goldOrnaments" x1="100" y1="100" x2="220" y2="220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF8E8" />
            <stop offset="0.5" stopColor="#D5AE61" />
            <stop offset="1" stopColor="#9C772F" />
          </linearGradient>
          <linearGradient id="dhotiYellow" x1="160" y1="210" x2="160" y2="270" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEFCBF" />
            <stop offset="0.4" stopColor="#ECC94B" />
            <stop offset="1" stopColor="#D69E2E" />
          </linearGradient>
        </defs>

        {/* 1. Divine Aura / Prabhavali */}
        <circle cx="160" cy="150" r="125" fill="url(#krishnaHalo)" />
        <circle
          cx="160"
          cy="150"
          r="115"
          stroke="#D5AE61"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.7"
        />

        {/* 2. Golden Lotus Seat Base */}
        <path
          d="M90 270 C 110 255, 140 250, 160 250 C 180 250, 210 255, 230 270 C 205 282, 175 285, 160 285 C 145 285, 115 282, 90 270 Z"
          fill="#D5AE61"
          stroke="#F7E5B5"
          strokeWidth="1.2"
        />
        {/* Lotus Petals below Baby */}
        <path d="M120 270 C 140 282, 180 282, 200 270 C 175 292, 145 292, 120 270 Z" fill="#E58FA5" />
        <path d="M70 268 C 100 260, 115 272, 130 275 C 95 280, 80 275, 70 268 Z" fill="#F5B2C5" />
        <path d="M250 268 C 220 260, 205 272, 190 275 C 225 280, 240 275, 250 268 Z" fill="#F5B2C5" />

        {/* 3. Baby Body & Golden Dhoti */}
        {/* Seated Chubby Baby Legs */}
        <path
          d="M100 240 C 95 220, 125 210, 160 215 C 195 210, 225 220, 220 240 C 215 258, 105 258, 100 240 Z"
          fill="url(#skinTone)"
        />
        {/* Golden Silk Dhoti Wrap */}
        <path
          d="M115 215 C 135 225, 185 225, 205 215 C 215 242, 195 258, 160 256 C 125 258, 105 242, 115 215 Z"
          fill="url(#dhotiYellow)"
          stroke="#D5AE61"
          strokeWidth="1"
        />
        {/* Golden Waist Belt (Aranjanam / Oddiyanam) */}
        <path
          d="M120 215 Q 160 228 200 215"
          stroke="#D5AE61"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="160" cy="223" r="3.5" fill="#FFF8E8" stroke="#9C772F" strokeWidth="0.8" />

        {/* Chubby Torso */}
        <path
          d="M130 160 C 120 180, 122 215, 160 218 C 198 215, 200 180, 190 160 C 185 145, 135 145, 130 160 Z"
          fill="url(#skinTone)"
        />

        {/* Pearl Necklace & Gold Chain (Kaasu Maalai) */}
        <path d="M138 162 Q 160 185 182 162" stroke="#FFF8E8" strokeWidth="2.5" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M142 170 Q 160 196 178 170" stroke="url(#goldOrnaments)" strokeWidth="2" strokeLinecap="round" />
        {/* Kaustubha Gem Locket */}
        <polygon points="160,195 165,200 160,205 155,200" fill="#E53E3E" stroke="#D5AE61" strokeWidth="1" />

        {/* Left Arm & Little Hand */}
        <path
          d="M130 165 C 110 175, 100 195, 112 210 C 118 218, 128 212, 132 200 Z"
          fill="url(#skinTone)"
        />
        {/* Right Arm holding Flute */}
        <path
          d="M190 165 C 210 175, 218 190, 208 208 C 200 214, 192 205, 188 195 Z"
          fill="url(#skinTone)"
        />

        {/* Golden Armlets & Bangles (Vanki & Valayal) */}
        <rect x="112" y="180" width="8" height="3" rx="1.5" fill="url(#goldOrnaments)" transform="rotate(-25 112 180)" />
        <rect x="198" y="180" width="8" height="3" rx="1.5" fill="url(#goldOrnaments)" transform="rotate(25 198 180)" />
        <circle cx="118" cy="208" r="3.5" fill="url(#goldOrnaments)" />
        <circle cx="202" cy="204" r="3.5" fill="url(#goldOrnaments)" />

        {/* Golden Flute across hands */}
        <rect
          x="110"
          y="190"
          width="115"
          height="7"
          rx="3.5"
          fill="url(#goldOrnaments)"
          stroke="#9C772F"
          strokeWidth="0.8"
          transform="rotate(-15 160 190)"
        />

        {/* 4. Chubby Cheerful Face */}
        <ellipse cx="160" cy="132" rx="35" ry="32" fill="url(#skinTone)" />
        {/* Chubby Cheeks highlight */}
        <ellipse cx="140" cy="140" rx="9" ry="6" fill="#F687B3" opacity="0.45" />
        <ellipse cx="180" cy="140" rx="9" ry="6" fill="#F687B3" opacity="0.45" />

        {/* Cute Ears with Golden Earrings (Kundalam) */}
        <circle cx="125" cy="134" r="7" fill="url(#skinTone)" />
        <circle cx="195" cy="134" r="7" fill="url(#skinTone)" />
        {/* Golden Kundalam drops */}
        <circle cx="123" cy="142" r="3.5" fill="url(#goldOrnaments)" />
        <circle cx="197" cy="142" r="3.5" fill="url(#goldOrnaments)" />

        {/* Big Innocent Expressive Eyes */}
        <ellipse cx="147" cy="130" rx="6" ry="7.5" fill="#1A202C" />
        <ellipse cx="173" cy="130" rx="6" ry="7.5" fill="#1A202C" />
        {/* Eye reflections */}
        <circle cx="149" cy="128" r="2.2" fill="#FFFFFF" />
        <circle cx="175" cy="128" r="2.2" fill="#FFFFFF" />
        <circle cx="145" cy="133" r="1.2" fill="#FFFFFF" />
        <circle cx="171" cy="133" r="1.2" fill="#FFFFFF" />

        {/* Gentle Eyebrows */}
        <path d="M141 122 Q 148 118 154 122" stroke="#1A202C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M166 122 Q 172 118 179 122" stroke="#1A202C" strokeWidth="1.5" strokeLinecap="round" />

        {/* Cute button nose */}
        <path d="M158 135 Q 160 138 162 135" stroke="#2B6CB0" strokeWidth="1.5" strokeLinecap="round" />

        {/* Sweet Gentle Smile */}
        <path d="M151 143 Q 160 151 169 143" stroke="#C53030" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M153 144 Q 160 149 167 144" fill="#FED7D7" />

        {/* 5. Sacred Vaishnava Tilak (Chandan Namam) */}
        <path d="M156 114 L 156 124 Q 160 127 164 124 L 164 114" stroke="#FFF8E8" strokeWidth="1.5" fill="none" />
        <line x1="160" y1="116" x2="160" y2="126" stroke="#E53E3E" strokeWidth="1.2" strokeLinecap="round" />

        {/* 6. Hair Topknot (Kudumi / Sikha) */}
        <path
          d="M136 112 C 132 95, 140 85, 160 85 C 180 85, 188 95, 184 112 C 172 106, 148 106, 136 112 Z"
          fill="#1A202C"
        />
        {/* Curled locks framing face */}
        <path d="M130 118 Q 126 128 132 130" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M190 118 Q 194 128 188 130" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />

        {/* Golden Hair Crown / Diadem */}
        <path
          d="M142 104 Q 160 98 178 104"
          stroke="url(#goldOrnaments)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="160" cy="100" r="3.5" fill="#E53E3E" stroke="#FFF8E8" strokeWidth="0.8" />

        {/* 7. Divine Peacock Feather Crown (Mayil Peeli) on Topknot */}
        <g transform="translate(145, 45) rotate(10)">
          {/* Feather outer */}
          <path
            d="M15 45 C 5 35, 0 25, 3 15 C 5 8, 12 3, 18 2 C 24 3, 29 8, 30 15 C 32 25, 25 35, 15 45 Z"
            fill="#287B70"
          />
          {/* Feather gold ring */}
          <ellipse cx="17" cy="18" rx="8" ry="11" fill="#D5AE61" />
          {/* Feather deep blue core */}
          <ellipse cx="17" cy="18" rx="5" ry="7" fill="#17345C" />
          <circle cx="17" cy="18" r="3" fill="#0B1D2D" />
          <circle cx="16" cy="16" r="1.2" fill="#FFF8E8" />
          {/* Stem */}
          <path d="M15 50 Q 16 30 17 5" stroke="#D5AE61" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
};

