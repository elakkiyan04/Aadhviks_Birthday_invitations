import React from "react";

interface GoldenArchProps {
  children: React.ReactNode;
  className?: string;
}

export const GoldenArch: React.FC<GoldenArchProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-peacock-blue/40 via-krishna-blue/60 to-deep-night/90 backdrop-blur-md border border-antique-gold/35 shadow-[0_15px_35px_-10px_rgba(11,29,45,0.8),inset_0_1px_1px_rgba(247,229,181,0.25)] overflow-hidden ${className}`}
    >
      {/* Decorative Arch Crest at Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-6 flex items-center justify-center pointer-events-none">
        <svg width="180" height="24" viewBox="0 0 180 24" fill="none">
          <path
            d="M10 2 Q 90 24 170 2"
            stroke="#D5AE61"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M30 0 Q 90 18 150 0"
            stroke="#F7E5B5"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <circle cx="90" cy="14" r="3" fill="#D5AE61" />
        </svg>
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-antique-gold/5 rounded-full blur-3xl pointer-events-none" />

      {children}
    </div>
  );
};

