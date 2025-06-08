"use client"

interface MoroccanPatternProps {
  className?: string
  color?: string
  opacity?: number
}

export function MoroccanPattern({ className = "", color = "#117485", opacity = 0.05 }: MoroccanPatternProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="moroccanStarPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Moroccan Star Pattern */}
            <path
              d="M40,0 L45,30 L75,40 L45,50 L40,80 L35,50 L5,40 L35,30 Z"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
            <path
              d="M40,10 L43,30 L65,40 L43,50 L40,70 L37,50 L15,40 L37,30 Z"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
            <path
              d="M40,20 L41,30 L55,40 L41,50 L40,60 L39,50 L25,40 L39,30 Z"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
          </pattern>

          <pattern id="moroccanTilePattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Moroccan Tile Pattern */}
            <rect x="0" y="0" width="80" height="80" fill="none" stroke={color} strokeWidth="0.5" />
            <rect x="10" y="10" width="60" height="60" fill="none" stroke={color} strokeWidth="0.5" />
            <rect x="20" y="20" width="40" height="40" fill="none" stroke={color} strokeWidth="0.5" />
            <path d="M0,0 L80,80 M80,0 L0,80" stroke={color} strokeWidth="0.5" fill="none" />
            <path d="M40,0 L40,80 M0,40 L80,40" stroke={color} strokeWidth="0.5" fill="none" />
          </pattern>

          <pattern id="moroccanArchPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Moroccan Arch Pattern */}
            <path d="M0,40 Q10,0 20,40" stroke={color} strokeWidth="0.5" fill="none" />
            <path d="M20,40 Q30,0 40,40" stroke={color} strokeWidth="0.5" fill="none" />
            <path d="M40,40 Q50,0 60,40" stroke={color} strokeWidth="0.5" fill="none" />
            <path d="M60,40 Q70,0 80,40" stroke={color} strokeWidth="0.5" fill="none" />

            <path d="M0,80 Q10,40 20,80" stroke={color} strokeWidth="0.5" fill="none" />
            <path d="M20,80 Q30,40 40,80" stroke={color} strokeWidth="0.5" fill="none" />
            <path d="M40,80 Q50,40 60,80" stroke={color} strokeWidth="0.5" fill="none" />
            <path d="M60,80 Q70,40 80,80" stroke={color} strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#moroccanStarPattern)" />
      </svg>
    </div>
  )
}
