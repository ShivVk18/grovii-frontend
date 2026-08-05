'use client'

import React from 'react'
import { Badge } from '../ui/badge'
import {
  HiMusicalNote as Music,
  HiSparkles as Sparkles,
  HiArrowTopRightOnSquare as ExternalLink
} from 'react-icons/hi2'

export default function MusicSuggestionsSection() {
  const searchQuery = encodeURIComponent("Golden Hour JVKE")

  return (
    <section id="music" className="w-full py-20 bg-secondary/10 relative font-sans select-none border-b border-border/60">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-primary/5 rounded-full px-3.5 py-1">
            Audio Matching
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Trending Music & Audio Recommendations
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            Handpicked audios synchronized to your video's pace and mood.
          </p>
        </div>

        {/* SINGLE MUSIC CARD PREVIEW */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="glass-panel border border-border p-6 rounded-3xl bg-card shadow-xl space-y-4 text-left">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Recommended Audio Track</span>
                <h3 className="text-lg font-black text-foreground mt-0.5">
                  🎵 Golden Hour — JVKE
                </h3>
              </div>
              <Badge variant="outline" className="text-[10px] font-bold border-primary/20 text-primary bg-primary/5 rounded-md px-2.5 py-1">
                Top 1% Trending
              </Badge>
            </div>

            <p className="text-xs font-semibold text-foreground/90 leading-relaxed bg-secondary/40 p-3.5 rounded-2xl border border-border/50 select-text">
              ⭐ <span className="font-bold">Why it fits:</span> Perfect for aesthetic morning routines. The gentle piano melody enhances peaceful sunrise visuals.
            </p>

            <div className="pt-1">
              <a 
                href={`https://open.spotify.com/search/${searchQuery}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <Music className="h-3.5 w-3.5" /> Listen on Spotify / Web <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Teaser Label */}
          <div className="text-center pt-1">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-border text-xs font-extrabold text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              +2 more audio recommendations matched to your shoot plan
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
