import React from "react";
import { PeacockFeather } from "./PeacockFeather";
import { LotusFlower } from "./LotusFlower";

interface GoldenDividerProps {
  className?: string;
  variant?: "feather" | "lotus" | "simple" | "flute";
}

export const GoldenDivider: React.FC<GoldenDividerProps> = ({
  className = "",
  variant = "feather",
}) => {
  return (
    <div className={`flex items-center justify-center my-6 space-x-3 w-full max-w-sm mx-auto ${className}`}>
      {/* Left filament */}
      <div className="flex-1 flex items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-antique-gold/60" />
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/40 to-antique-gold" />
      </div>

      {/* Center motif */}
      <div className="flex-shrink-0 flex items-center justify-center">
        {variant === "feather" && (
          <div className="transform rotate-45 scale-90">
            <PeacockFeather size={24} />
          </div>
        )}
        {variant === "lotus" && <LotusFlower size={26} />}
        {variant === "simple" && (
          <div className="w-2.5 h-2.5 rotate-45 border border-antique-gold bg-antique-gold/30" />
        )}
      </div>

      {/* Right filament */}
      <div className="flex-1 flex items-center">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-antique-gold via-antique-gold/40 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-antique-gold/60" />
      </div>
    </div>
  );
};

export const OrnateCorner: React.FC<{
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}> = ({ position }) => {
  const rotation =
    position === "top-left"
      ? "rotate-0"
      : position === "top-right"
      ? "rotate-90"
      : position === "bottom-right"
      ? "rotate-180"
      : "-rotate-90";

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute ${
        position === "top-left"
          ? "top-2 left-2"
          : position === "top-right"
          ? "top-2 right-2"
          : position === "bottom-left"
          ? "bottom-2 left-2"
          : "bottom-2 right-2"
      } ${rotation} pointer-events-none opacity-80`}
    >
      <path
        d="M2 18 C 2 9, 9 2, 18 2 L 2 2 Z"
        fill="url(#goldCornerShimmer)"
        opacity="0.3"
      />
      <path
        d="M2 28 V 2 H 28"
        stroke="#D5AE61"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 22 V 6 H 22"
        stroke="#F7E5B5"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="9" cy="9" r="2" fill="#D5AE61" />
      <defs>
        <linearGradient id="goldCornerShimmer" x1="2" y1="2" x2="20" y2="20">
          <stop stopColor="#F7E5B5" />
          <stop offset="1" stopColor="#9C772F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

