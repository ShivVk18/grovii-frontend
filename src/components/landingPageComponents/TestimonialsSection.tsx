'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import { HiStar as StarIcon } from 'react-icons/hi2'

const reviews = [
  {
    name: "Aarav Sharma",
    role: "Tech Creator (180K)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    review: "I used to spend 2 hours staring at a blank document. Now I have 5 shot-by-shot scenes ready in 15 seconds.",
    rotation: "-rotate-1"
  },
  {
    name: "Elena Rostova",
    role: "Visual Storyteller (320K)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    review: "The camera directions are insanely accurate. It feels like having an experienced director on set.",
    rotation: "rotate-1"
  },
  {
    name: "Rohan Varma",
    role: "SaaS Founder & Creator (95K)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    review: "Reading the script in teleprompter mode while recording cut my shooting time in half. No more endless retakes.",
    rotation: "-rotate-1"
  },
  {
    name: "Sophia Chen",
    role: "Design Educator (240K)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    review: "The audio matching is magic. It suggested Golden Hour for my morning reel and it got 1.2M views!",
    rotation: "rotate-1"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-[#FFF7F0] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/20">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Loved By Creators
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            Why creators film with Grovii.
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium">
            Join thousands of creators saving hours on every shoot.
          </p>
        </div>

        {/* Floating Auto Marquee */}
        <div className="relative overflow-hidden py-2">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 w-max"
          >
            {[...reviews, ...reviews].map((r, idx) => (
              <div
                key={idx}
                className={`w-72 sm:w-80 rounded-2xl border border-[#8B5E3C]/20 bg-[#FAF7F2] p-5 shadow-sm text-left space-y-3 shrink-0 ${r.rotation}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#8B5E3C]/30"
                  />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#3D2B1F]">{r.name}</h4>
                    <p className="text-[10px] font-semibold text-[#8B5E3C]">{r.role}</p>
                  </div>
                </div>

                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5 fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs font-medium text-[#5C4033] leading-relaxed select-text italic">
                  “{r.review}”
                </p>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
