'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { HiArrowRight as ArrowRight, HiSparkles as Sparkles } from 'react-icons/hi2'

export default function FinalCTASection() {
  return (
    <section id="start-creating" className="w-full py-24 bg-secondary/20 relative font-sans select-none border-b border-border/60 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl text-center space-y-8 relative z-10">
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
            <span>Ready to Shoot</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
            Ready to turn your next idea <br className="hidden sm:inline" />
            into a complete video plan?
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-xl mx-auto">
            Open Grovii and start creating camera-ready shoot plans in seconds.
          </p>
        </div>

        <div className="pt-2">
          <Button size="lg" asChild className="rounded-full font-bold text-base h-14 px-10 brand-gradient text-white shadow-xl hover:opacity-95 transition-all">
            <Link href="/dashboard" className="flex items-center gap-2">
              Start Creating
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
