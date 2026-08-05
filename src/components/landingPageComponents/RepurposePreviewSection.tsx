'use client'

import React from 'react'
import { Badge } from '../ui/badge'
import {
  FaInstagram as Instagram,
  FaLinkedinIn as Linkedin,
  FaTwitter as Twitter,
  FaYoutube as Youtube
} from 'react-icons/fa6'

const platforms = [
  { name: "Instagram", desc: "Carousels & Reels", icon: <Instagram className="h-5 w-5 text-[#E1306C]" /> },
  { name: "LinkedIn", desc: "Thought Leadership Posts", icon: <Linkedin className="h-5 w-5 text-[#0A66C2]" /> },
  { name: "X (Twitter)", desc: "Short Threads", icon: <Twitter className="h-5 w-5 text-foreground" /> },
  { name: "YouTube", desc: "Shorts Descriptions", icon: <Youtube className="h-5 w-5 text-[#FF0000]" /> }
]

export default function RepurposePreviewSection() {
  return (
    <section id="repurpose" className="w-full py-20 bg-background relative font-sans select-none border-b border-border/60">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-primary/5 rounded-full px-3.5 py-1">
            Multi-Platform Repurposing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Turn One Idea Into Content Everywhere
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            Grovii automatically converts your shoot plan into formatted text posts for all your channels.
          </p>
        </div>

        {/* 4 SMALL PLATFORM CHIPS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {platforms.map((p, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-border bg-card text-center space-y-2.5 hover:border-primary/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-secondary/60 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-foreground">{p.name}</h4>
                <p className="text-[11px] font-medium text-muted-foreground mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
