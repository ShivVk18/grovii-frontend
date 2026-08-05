'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiSparkles as Sparkles,
  HiGlobeAlt as GlobeIcon,
  HiClock as ClockIcon,
  HiCheckBadge as CheckBadge
} from 'react-icons/hi2'

const stats = [
  { value: "20,000+", label: "Storyboards Generated", icon: <Sparkles className="h-5 w-5 text-amber-600" /> },
  { value: "100+", label: "Languages Supported", icon: <GlobeIcon className="h-5 w-5 text-[#8B5E3C]" /> },
  { value: "< 30 sec", label: "Average Planning Time", icon: <ClockIcon className="h-5 w-5 text-emerald-600" /> },
  { value: "4 Networks", label: "One Idea, Everywhere", icon: <CheckBadge className="h-5 w-5 text-purple-600" /> }
]

const creatorNiches = [
  "Tech & Productivity Creators",
  "Fitness & Wellness Coaches",
  "Design Educators",
  "SaaS Founders & Marketers",
  "Lifestyle Vloggers",
  "Finance & Business Storytellers"
]

export default function TrustStatsSection() {
  return (
    <section className="w-full py-16 md:py-20 bg-[#FAF7F2] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/15">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-10 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-2 max-w-xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Visual Trust & Speed
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            Built for creators who value time.
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium">
            Join thousands of creators saving hours on every video shoot.
          </p>
        </div>

        {/* 4 STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-3xl border border-[#8B5E3C]/20 bg-[#FFF7F0] p-5 text-center space-y-2 shadow-sm hover:border-[#8B5E3C]/40 transition-all"
            >
              <div className="flex justify-center">{s.icon}</div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#3D2B1F] tracking-tight">{s.value}</h3>
              <p className="text-xs text-[#5C4033] font-bold">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CREATOR NICHES MARQUEE */}
        <div className="relative overflow-hidden py-3 pt-4">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-3 w-max"
          >
            {[...creatorNiches, ...creatorNiches].map((niche, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-[#FAF1E8] border border-[#8B5E3C]/20 text-xs font-extrabold text-[#8B5E3C] shrink-0"
              >
                ✨ {niche}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
