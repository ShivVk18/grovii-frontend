'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { HiCheck, HiSparkles as Sparkles, HiArrowRight as ArrowRight } from 'react-icons/hi2'

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full py-14 md:py-18 bg-[#FAF7F2] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/20">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-10 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Simple Pricing
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            Start creating today, 100% free.
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium">
            No credit card required. Upgrade anytime as your channel grows.
          </p>
        </div>

        {/* 3D Depth Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center max-w-4xl mx-auto">
          
          {/* Plan 1: Free */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-3xl border border-[#8B5E3C]/20 bg-[#FFF7F0] p-5 text-left space-y-5 shadow-xs"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-black text-[#8B5E3C] uppercase tracking-wider">Free Creator</span>
              <h3 className="text-2xl font-black text-[#3D2B1F]">₹0</h3>
              <p className="text-[11px] text-[#5C4033] font-medium">Testing your first video ideas.</p>
            </div>

            <ul className="space-y-2 text-xs text-[#5C4033] font-semibold">
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> 3 Complete Shoot Plans / mo
              </li>
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> 5-Scene Storyboards & Hooks
              </li>
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> Voiceover Script Generator
              </li>
            </ul>

            <Button variant="outline" size="sm" asChild className="w-full rounded-full font-bold text-xs border-[#8B5E3C]/30 text-[#8B5E3C] hover:bg-[#FAF1E8]">
              <Link href="/dashboard">Get Started Free</Link>
            </Button>
          </motion.div>

          {/* Plan 2: FEATURED PRO PLAN */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.03 }}
            className="rounded-[32px] border-2 border-[#8B5E3C] bg-gradient-to-b from-[#FFF7F0] via-[#FAF1E8] to-[#FFF7F0] p-6 text-left space-y-5 shadow-xl relative z-10 scale-105"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#8B5E3C] text-white text-[9px] font-extrabold uppercase tracking-widest shadow-xs">
              ⭐ Most Popular
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-black text-[#8B5E3C] uppercase tracking-wider">Pro Creator</span>
              <div className="flex items-baseline gap-1">
                <h3 className="text-3xl font-black text-[#3D2B1F]">₹999</h3>
                <span className="text-xs text-[#5C4033] font-bold">/ month</span>
              </div>
              <p className="text-[11px] text-[#5C4033] font-medium">Unlimited creative speed for creators.</p>
            </div>

            <ul className="space-y-2 text-xs text-[#3D2B1F] font-extrabold">
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> Unlimited Shoot Plans & Hooks
              </li>
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> Advanced Camera Directions
              </li>
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> Teleprompter Voiceover Mode
              </li>
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> Spotify Trending Audio Matching
              </li>
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> Multi-Platform Repurposing
              </li>
            </ul>

            <Button size="sm" asChild className="w-full rounded-full font-bold text-xs h-11 bg-gradient-to-r from-[#8B5E3C] to-[#C48B5E] text-white shadow-md hover:opacity-95">
              <Link href="/dashboard" className="flex items-center justify-center gap-1.5">
                Start 14-Day Free Trial <ArrowRight className="h-3.5 w-3.5 inline" />
              </Link>
            </Button>
          </motion.div>

          {/* Plan 3: Agency */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-3xl border border-[#8B5E3C]/20 bg-[#FFF7F0] p-5 text-left space-y-5 shadow-xs"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-black text-[#8B5E3C] uppercase tracking-wider">Agency</span>
              <h3 className="text-2xl font-black text-[#3D2B1F]">₹2,499</h3>
              <p className="text-[11px] text-[#5C4033] font-medium">For teams & content agencies.</p>
            </div>

            <ul className="space-y-2 text-xs text-[#5C4033] font-semibold">
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> Everything in Pro Tier
              </li>
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> Multi-Seat Workspaces
              </li>
              <li className="flex items-center gap-2">
                <HiCheck className="h-3.5 w-3.5 text-[#8B5E3C]" /> Priority Dedicated Queue
              </li>
            </ul>

            <Button variant="outline" size="sm" asChild className="w-full rounded-full font-bold text-xs border-[#8B5E3C]/30 text-[#8B5E3C] hover:bg-[#FAF1E8]">
              <Link href="/dashboard">Contact Sales</Link>
            </Button>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
