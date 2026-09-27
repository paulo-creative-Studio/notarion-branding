import React from 'react';

interface NotarionLogoProps {
  className?: string;
  variant?: 'icon' | 'horizontal' | 'card' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withSubtext?: boolean;
}

/**
 * NotarionBrandIcon - Official vector reproduction of the Notarion Brand emblem
 * Extracted from the official transparent PNG provided by the brand.
 */
export const NotarionBrandIcon: React.FC<{ className?: string; glow?: boolean }> = ({ 
  className = "w-8 h-8",
  glow = false
}) => {
  return (
    <svg
      viewBox="0 0 1000 880"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]' : ''} shrink-0 transition-transform duration-200`}
    >
      <defs>
        {/* Official Gold Gradient matching Notarion Brand brandbook */}
        <linearGradient id="notarionGoldGrad" x1="100" y1="160" x2="900" y2="840" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f7e599" />
          <stop offset="35%" stopColor="#dfb744" />
          <stop offset="70%" stopColor="#cfa12b" />
          <stop offset="100%" stopColor="#9a7414" />
        </linearGradient>

        <linearGradient id="notarionGoldShine" x1="300" y1="200" x2="700" y2="800" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="25%" stopColor="#f5dc83" />
          <stop offset="75%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#93741d" />
        </linearGradient>

        <filter id="notarionGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g fill="url(#notarionGoldGrad)">
        {/* Top Orbital Swirl */}
        <path
          d="M 242 372 
             C 270 290, 375 160, 530 160 
             C 655 160, 745 220, 798 305 
             L 760 308 
             C 715 235, 638 185, 528 185 
             C 388 185, 290 285, 242 372 Z"
        />

        {/* Left Wing / Diamond Point */}
        <path
          d="M 5 540 
             L 242 372 
             C 220 420, 190 475, 190 540 
             C 190 605, 220 660, 242 700 
             L 5 540 Z"
        />

        {/* Bottom Orbital Tail Swoop */}
        <path
          d="M 222 545
             C 222 610, 250 670, 290 725
             C 345 800, 440 855, 545 855
             C 615 855, 680 825, 725 775
             C 710 782, 675 798, 630 808
             C 525 830, 430 800, 360 735
             C 305 680, 260 605, 260 545
             Z"
        />

        {/* Central Upright Wedge / Sail (Left Stroke of N) */}
        <path
          d="M 385 285 
             L 570 550 
             L 565 715 
             L 430 715 
             L 385 285 Z"
        />

        {/* Right Fluid Calligraphic Ribbon (Right Stroke of N & connecting loop) */}
        <path
          d="M 586 432
             C 586 405, 608 388, 636 388
             C 630 435, 615 495, 615 548
             C 615 625, 650 680, 715 700
             C 785 720, 845 680, 885 620
             L 995 570
             C 930 685, 830 755, 720 742
             C 625 730, 570 655, 570 555
             C 570 500, 578 455, 586 432 Z"
        />

        {/* Right Corner Wing Contour */}
        <path
          d="M 798 305
             C 830 355, 875 425, 920 500
             L 995 570
             L 925 572
             C 875 490, 825 390, 798 305 Z"
        />
      </g>
    </svg>
  );
};

/**
 * Full Brand Lockup with authentic typography matching user's Image 3
 * "Notarion" in classic calligraphic/flourish script + "BRAND" / "BRANDING" in Roman tracked caps
 */
export const NotarionLogo: React.FC<NotarionLogoProps> = ({
  className = "",
  variant = 'horizontal',
  size = 'md',
  withSubtext = false
}) => {
  if (variant === 'icon') {
    const sizeClasses = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-10 h-10',
      xl: 'w-14 h-14'
    }[size];

    return <NotarionBrandIcon className={`${sizeClasses} ${className}`} glow />;
  }

  if (variant === 'badge') {
    // Matches Image 1: circular dark badge with the gold emblem
    const badgeSizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20'
    }[size];

    return (
      <div className={`rounded-full bg-[#161719] border border-[#d4af37]/35 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(212,175,55,0.2)] ${badgeSizes} ${className}`}>
        <NotarionBrandIcon className="w-full h-full" />
      </div>
    );
  }

  if (variant === 'card') {
    // Matches Image 3: official presentation card with emblem + cursive "Notarion" + Roman "BRANDING"
    return (
      <div className={`flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-black border border-[#d4af37]/30 shadow-[0_4px_30px_rgba(212,175,55,0.15)] ${className}`}>
        <NotarionBrandIcon className="w-24 h-24 mb-4" glow />
        
        {/* Authentic Calligraphic Script for "Notarion" */}
        <div className="text-3xl sm:text-4xl text-[#dfb744] font-serif italic tracking-wide select-none drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          <span className="text-4xl sm:text-5xl not-italic font-normal" style={{ fontFamily: '"Brush Script MT", "Snell Roundhand", cursive, serif' }}>N</span>otarion
        </div>
        
        {/* Roman Caps for "BRANDING" */}
        <div className="text-xs sm:text-sm font-semibold tracking-[0.35em] text-[#e6ca65] uppercase mt-1 select-none">
          BRANDING
        </div>

        {withSubtext && (
          <div className="text-[10px] text-zinc-400 mt-3 font-sans tracking-wider uppercase">
            Soluções Digitais para Negócios Locais
          </div>
        )}
      </div>
    );
  }

  // Default: Horizontal Lockup for Navbar and Headers
  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-b from-[#18191c] to-[#0e0f12] border border-[#d4af37]/30 p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#d4af37]/60 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
        <NotarionBrandIcon className="w-full h-full" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className="font-display font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-[#f3df89] transition-colors">
            NOTARION
          </span>
          <span className="font-display font-semibold text-xs sm:text-sm text-[#d4af37] tracking-widest">
            BRAND
          </span>
        </div>
        {withSubtext && (
          <span className="text-[9px] tracking-wider uppercase text-zinc-400 font-medium">
            Digital Solutions
          </span>
        )}
      </div>
    </div>
  );
};
