import React from 'react'

export interface LogoProps {
  /** Size variant or pixel dimension */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  /** Display variant: icon only, full brand (icon + title + subtitle), or compact */
  variant?: 'icon' | 'full' | 'horizontal' | 'compact'
  /** Theme adjustment for light / dark */
  theme?: 'default' | 'light' | 'dark'
  /** Custom className for the container */
  className?: string
  /** Whether to animate on hover */
  animated?: boolean
}

/**
 * Pure Minimalist Vector Icon for "مرز آگاهی" (Ultra-Minimal Infinity)
 * Philosophy:
 * - Uncluttered, floating pure lemniscate ribbon.
 * - Smooth circular lobes with perfect mathematical tangency.
 * - Velvety micro-gradient from Deep Teal (#245E5D) to Radiant Champagne Gold (#C99B5B).
 * - Modern, airy, luxury tech aesthetic.
 */
export const LogoIcon: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({
  size = 50,
  className = '',
  animated = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ease-out ${animated ? 'hover:scale-105' : ''} ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Velvety continuous micro-gradient */}
        <linearGradient id="minimalInfinityGrad" x1="10" y1="25" x2="90" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B4D4B" />
          <stop offset="25%" stopColor="#245E5D" />
          <stop offset="48%" stopColor="#4A8884" />
          <stop offset="52%" stopColor="#CCA462" />
          <stop offset="75%" stopColor="#A77D46" />
          <stop offset="90%" stopColor="#D9B167" />
          <stop offset="100%" stopColor="#8C632D" />
        </linearGradient>

        {/* Crossing overlap highlight */}
        <linearGradient id="crossingLight" x1="42" y1="38" x2="58" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A8884" />
          <stop offset="50%" stopColor="#E2BE76" />
          <stop offset="100%" stopColor="#A77D46" />
        </linearGradient>

        {/* Ultra-soft ambient aura */}
        <radialGradient id="pureAura" cx="50" cy="50" r="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F9F3E3" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#E8F1F0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E8F1F0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle, soft ambient glow in the backdrop */}
      <circle cx="50" cy="50" r="30" fill="url(#pureAura)" />

      {/*
        Pure Mathematical Lemniscate (Infinity)
        Left & Right lobes are true round circles (R=19) with perfectly vertical outer tangents.
      */}
      <path
        d="M 50 50
           C 42 38, 36 31, 28.5 31
           C 18.8 31, 11 39.5, 11 50
           C 11 60.5, 18.8 69, 28.5 69
           C 36 69, 42 62, 50 50
           C 58 38, 64 31, 71.5 31
           C 81.2 31, 89 39.5, 89 50
           C 89 60.5, 81.2 69, 71.5 69
           C 64 69, 58 62, 50 50 Z"
        stroke="url(#minimalInfinityGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Minimalist ribbon crossing weave */}
      <path
        d="M 43 40.5 C 45.5 44, 47.8 47.2, 50 50 C 52.2 52.8, 54.5 56, 57 59.5"
        stroke="url(#crossingLight)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Pure Focal Point of Light */}
      <circle cx="50" cy="50" r="2.5" fill="#FFFDF8" />
    </svg>
  )
}

export const Logo: React.FC<LogoProps> = ({
  size = 'lg',
  variant = 'full',
  theme = 'default',
  className = '',
  animated = true,
}) => {
  // Dimension mappings
  const pixelSizes = {
    sm: 34,
    md: 44,
    lg: 52,
    xl: 68,
  }

  const iconPx = typeof size === 'number' ? size : pixelSizes[size] || 52

  const titleSizes = {
    sm: 'text-sm font-bold',
    md: 'text-base sm:text-lg font-bold',
    lg: 'text-lg sm:text-xl font-bold tracking-tight',
    xl: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
  }

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[11px] sm:text-xs font-medium',
    xl: 'text-xs sm:text-sm font-medium',
  }

  const isLight = theme === 'light'
  const isDark = theme === 'dark'

  const titleColor = isLight ? 'text-white' : isDark ? 'text-slate-100' : 'text-text-primary'
  const subtitleColor = isLight ? 'text-white/80' : isDark ? 'text-slate-400' : 'text-text-secondary'

  if (variant === 'icon') {
    return <LogoIcon size={iconPx} className={className} animated={animated} />
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none text-right ${className}`}>
      <LogoIcon size={iconPx} animated={animated} />

      <div className="flex flex-col justify-center leading-tight">
        <span className={`${typeof size === 'string' ? titleSizes[size] : 'text-lg font-bold'} ${titleColor} font-sans`}>
          مرز آگاهی
        </span>
        {variant !== 'compact' && (
          <span className={`${typeof size === 'string' ? subtitleSizes[size] : 'text-[11px]'} ${subtitleColor} font-sans mt-0.5 opacity-90`}>
            آرشیو پژوهشی تجارب مرزی آگاهی
          </span>
        )}
      </div>
    </div>
  )
}

export default Logo
