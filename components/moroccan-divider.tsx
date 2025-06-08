"use client"

import { motion } from "framer-motion"

interface MoroccanDividerProps {
  color?: string
  flip?: boolean
  className?: string
}

export function MoroccanDivider({ color = "#FE9305", flip = false, className = "" }: MoroccanDividerProps) {
  return (
    <div className={`w-full h-16 overflow-hidden ${className}`}>
      <motion.svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ transform: flip ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        {/* Base Wave */}
        <path
          d="M0,120 C240,60 480,30 720,30 C960,30 1200,60 1440,120 L1440,120 L0,120 Z"
          fill={color}
          fillOpacity="0.1"
        />

        {/* Moroccan Arch Pattern */}
        <g opacity="0.3">
          <path d="M40,120 Q60,90 80,120" stroke={color} fill="none" />
          <path d="M120,120 Q140,90 160,120" stroke={color} fill="none" />
          <path d="M200,120 Q220,90 240,120" stroke={color} fill="none" />
          <path d="M280,120 Q300,90 320,120" stroke={color} fill="none" />
          <path d="M360,120 Q380,90 400,120" stroke={color} fill="none" />
          <path d="M440,120 Q460,90 480,120" stroke={color} fill="none" />
          <path d="M520,120 Q540,90 560,120" stroke={color} fill="none" />
          <path d="M600,120 Q620,90 640,120" stroke={color} fill="none" />
          <path d="M680,120 Q700,90 720,120" stroke={color} fill="none" />
          <path d="M760,120 Q780,90 800,120" stroke={color} fill="none" />
          <path d="M840,120 Q860,90 880,120" stroke={color} fill="none" />
          <path d="M920,120 Q940,90 960,120" stroke={color} fill="none" />
          <path d="M1000,120 Q1020,90 1040,120" stroke={color} fill="none" />
          <path d="M1080,120 Q1100,90 1120,120" stroke={color} fill="none" />
          <path d="M1160,120 Q1180,90 1200,120" stroke={color} fill="none" />
          <path d="M1240,120 Q1260,90 1280,120" stroke={color} fill="none" />
          <path d="M1320,120 Q1340,90 1360,120" stroke={color} fill="none" />
          <path d="M1400,120 Q1420,90 1440,120" stroke={color} fill="none" />
        </g>

        {/* Decorative Dots */}
        <g opacity="0.5">
          <circle cx="60" cy="100" r="2" fill={color} />
          <circle cx="140" cy="100" r="2" fill={color} />
          <circle cx="220" cy="100" r="2" fill={color} />
          <circle cx="300" cy="100" r="2" fill={color} />
          <circle cx="380" cy="100" r="2" fill={color} />
          <circle cx="460" cy="100" r="2" fill={color} />
          <circle cx="540" cy="100" r="2" fill={color} />
          <circle cx="620" cy="100" r="2" fill={color} />
          <circle cx="700" cy="100" r="2" fill={color} />
          <circle cx="780" cy="100" r="2" fill={color} />
          <circle cx="860" cy="100" r="2" fill={color} />
          <circle cx="940" cy="100" r="2" fill={color} />
          <circle cx="1020" cy="100" r="2" fill={color} />
          <circle cx="1100" cy="100" r="2" fill={color} />
          <circle cx="1180" cy="100" r="2" fill={color} />
          <circle cx="1260" cy="100" r="2" fill={color} />
          <circle cx="1340" cy="100" r="2" fill={color} />
          <circle cx="1420" cy="100" r="2" fill={color} />
        </g>
      </motion.svg>
    </div>
  )
}
