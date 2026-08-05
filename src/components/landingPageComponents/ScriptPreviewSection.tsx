'use client'

import React from 'react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  HiDocumentText as FileText,
  HiArrowRight as ArrowRight
} from 'react-icons/hi2'

export default function ScriptPreviewSection() {
  return (
    <section id="script" className="w-full py-24 bg-secondary/10 relative font-sans select-none border-b border-border/60">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-primary/5 rounded-full px-3.5 py-1">
            Voiceover Script
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Read Directly While Filming
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            A full, synchronized voiceover script ready for your teleprompter.
          </p>
        </div>

        {/* FADED SCRIPT PREVIEW BLOCK */}
        <div className="glass-panel rounded-3xl border border-border p-6 sm:p-8 bg-card shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center gap-2 pb-3 border-b border-border/60">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
              Voiceover Script Teaser
            </h3>
          </div>

          <div className="relative pt-2">
            <p className="text-foreground font-mono text-sm sm:text-base leading-relaxed whitespace-pre-wrap select-text">
              “Most productive days begin before everyone else wakes up.
              {"\n\n"}
              Step one: 500ml of cold water before checking any notifications.
              {"\n\n"}
              Step two: Write down the top 3 non-negotiables for today in a physical notebook...”
            </p>

            {/* Gradient Overlay Mask */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/75 to-card pointer-events-none" />
          </div>

          {/* Continue Reading Action Button */}
          <div className="pt-6 text-center relative z-10">
            <Button size="sm" asChild variant="outline" className="rounded-full font-bold text-xs px-7 py-3 border-primary/30 text-primary hover:bg-primary/10">
              <Link href="/dashboard" className="flex items-center gap-2">
                Continue reading full script
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
