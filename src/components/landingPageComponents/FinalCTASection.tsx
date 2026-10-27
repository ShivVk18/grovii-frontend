'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { HiArrowRight as ArrowRight, HiSparkles as Sparkles } from 'react-icons/hi2'

export default function FinalCTASection() {
  return (
    <section className="w-full py-20 md:py-28 bg-card relative font-sans select-none overflow-hidden border-b border-border">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center space-y-6 relative z-10">
        
        <div className="space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary border border-border text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Ready to Shoot</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Ready to direct your next video?
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-md mx-auto">
            Drop your idea into Grovii and get a complete, camera-ready shoot plan in 30 seconds.
          </p>
        </div>

        <div className="pt-2">
          <Button
            size="lg"
            asChild
            className="rounded-2xl h-13 px-9 bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-95 transition-all gap-2"
          >
            <Link href="/dashboard/create">
              <span>Start Directing Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground font-medium pt-1">
          Free forever plan available · 3 shoot plans included every month
        </p>

      </div>
    </section>
  )
}
