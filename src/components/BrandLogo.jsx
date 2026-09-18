import React from 'react';

const BrandLogo = ({ className = "", align = "center", variant = "navbar" }) => {
  const alignmentClass = align === "left" ? "items-start" : align === "right" ? "items-end" : "items-center";
  const textAlignmentClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  // Define typography styles based on the variant
  let parentStyles = "";
  let brandStyles = "";

  let logoStyles = "";

  switch (variant) {
    case "navbar":
      parentStyles = "text-[9px] md:text-[10px] lg:text-[11px] mb-0.5 tracking-[0.2em]";
      brandStyles = "text-lg md:text-xl lg:text-2xl tracking-[0.1em] font-bold";
      logoStyles = "h-9 md:h-12 lg:h-[52px]"; // ~36px to 52px
      break;

    case "footer":
      parentStyles = "text-[10px] md:text-[11px] mb-1 tracking-[0.2em]";
      brandStyles = "text-xl md:text-2xl tracking-[0.1em] font-bold";
      logoStyles = "h-10 md:h-[50px] lg:h-[60px]"; // ~40px to 60px
      break;

    case "loading":
      parentStyles = "text-[clamp(8px,2.5vw,12px)] md:text-sm lg:text-base mb-1 md:mb-3 tracking-[0.15em] md:tracking-[0.25em]";
      brandStyles = "text-[clamp(21px,6vw,32px)] md:text-5xl lg:text-6xl tracking-[0.05em] md:tracking-[0.1em] font-bold";
      logoStyles = "h-[clamp(38px,12vw,55px)] md:h-[80px] lg:h-[100px]"; // responsive scaling
      break;

    default:
      parentStyles = "text-[10px] md:text-xs mb-1 tracking-[0.2em]";
      brandStyles = "text-xl md:text-2xl tracking-[0.1em] font-bold";
      logoStyles = "h-10 md:h-14";
      break;
  }

  const isStackedMobile = variant === "loading";
  const layoutClass = isStackedMobile ? "flex-col md:flex-row" : "flex-row";

  return (
    <div className={`flex ${layoutClass} items-center justify-center gap-3 md:gap-4 w-fit max-w-[90vw] mx-auto ${className}`}>
      <img 
        src="/image/logos.png" 
        alt="Sakthi Catering Logo" 
        className={`object-contain shrink-0 ${logoStyles}`} 
      />
      <div className={`flex flex-col ${alignmentClass} ${textAlignmentClass}`}>
        <span className={`text-luxury-gold uppercase whitespace-nowrap ${parentStyles}`} style={{ fontWeight: 400 }}>
          Sulur S.M. Shanmugam & Son
        </span>
        <span className={`font-serif text-luxury-cream whitespace-nowrap leading-none ${brandStyles}`}>
          SAKTHI CATERING
        </span>
      </div>
    </div>
  );
};

export default BrandLogo;
