import React from "react";

interface LotusFlowerProps {
  className?: string;
  size?: number;
}

export const LotusFlower: React.FC<LotusFlowerProps> = ({ className = "", size = 48 }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-[0_4px_10px_rgba(213,174,97,0.3)] ${className}`}
    >
      <defs>
        <linearGradient id="lotusCenterPetal" x1="50" y1="10" x2="50" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF0F5" />
          <stop offset="0.5" stopColor="#F5B2C5" />
          <stop offset="1" stopColor="#D5AE61" />
        </linearGradient>
        <linearGradient id="lotusSidePetal" x1="20" y1="20" x2="50" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE2E8" />
          <stop offset="0.6" stopColor="#E58FA5" />
          <stop offset="1" stopColor="#9C772F" />
        </linearGradient>
      </defs>

      {/* Back outer petals */}
      <path
        d="M50 55 C 20 45, 10 25, 22 15 C 32 25, 42 45, 50 55 Z"
        fill="url(#lotusSidePetal)"
        opacity="0.8"
      />
      <path
        d="M50 55 C 80 45, 90 25, 78 15 C 68 25, 58 45, 50 55 Z"
        fill="url(#lotusSidePetal)"
        opacity="0.8"
      />

      {/* Mid petals */}
      <path
        d="M50 55 C 30 40, 20 20, 35 12 C 44 24, 48 42, 50 55 Z"
        fill="url(#lotusSidePetal)"
      />
      <path
        d="M50 55 C 70 40, 80 20, 65 12 C 56 24, 52 42, 50 55 Z"
        fill="url(#lotusSidePetal)"
      />

      {/* Central upright bud/petal */}
      <path
        d="M50 55 C 40 38, 42 16, 50 5 C 58 16, 60 38, 50 55 Z"
        fill="url(#lotusCenterPetal)"
        stroke="#D5AE61"
        strokeWidth="0.8"
      />

      {/* Golden base pod */}
      <ellipse cx="50" cy="55" rx="14" ry="4" fill="#D5AE61" stroke="#9C772F" strokeWidth="0.6" />
    </svg>
  );
};

