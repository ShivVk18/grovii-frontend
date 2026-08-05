'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { HiArrowRight as ArrowRight, HiSparkles as Sparkles } from 'react-icons/hi2'

export default function FinalCTASection() {
  return (
    <section id="start-creating" className="w-full py-20 md:py-24 bg-[#FAF7F2] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/15">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-gradient-to-r from-[#8B5E3C]/20 via-[#F5DFC0]/35 to-[#C48B5E]/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center space-y-6 relative z-10">
        
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF1E8] border border-[#8B5E3C]/20 text-[11px] font-bold text-[#8B5E3C]">
            <Sparkles className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
            <span>Ready to Shoot</span>
          </div>

          {/* Large Editorial Headline */}
          <h2 className="text-3xl sm:text-5xl font-black text-[#3D2B1F] tracking-tight leading-tight">
            Ready to turn your next idea <br className="hidden sm:inline" />
            into a complete video plan?
          </h2>

          <p className="text-sm sm:text-base text-[#5C4033]/80 font-medium max-w-md mx-auto">
            Open Grovii and start creating camera-ready shoot plans in seconds.
          </p>
        </div>

        {/* Single Primary CTA */}
        <motion.div 
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="pt-2 inline-block"
        >
          <Button size="lg" asChild className="rounded-full font-extrabold text-base h-14 px-10 bg-gradient-to-r from-[#8B5E3C] via-[#A47551] to-[#C48B5E] text-white shadow-xl hover:opacity-95 transition-all group">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              Start Creating Free
              <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
