import React from "react";

export const EloraFooter: React.FC = () => {
  return (
    <footer className="w-full py-8 text-center select-none">
      <p className="text-[11px] sm:text-xs text-antique-gold/60 font-sans tracking-wide">
        Created by Elora_Moments |{" "}
        <a
          href="tel:0762743069"
          className="hover:text-antique-gold transition-colors underline-offset-2 hover:underline"
        >
          0762743069
        </a>
      </p>
    </footer>
  );
};
