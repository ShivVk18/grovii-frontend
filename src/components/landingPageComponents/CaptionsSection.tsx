'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  FaInstagram as Instagram,
  FaLinkedinIn as Linkedin,
  FaTwitter as Twitter,
  FaYoutube as Youtube
} from 'react-icons/fa6'

const masonryCaptions = [
  {
    platform: "Instagram Reel",
    icon: <Instagram className="h-4 w-4 text-[#E1306C]" />,
    height: "h-auto",
    caption: "Small morning habits compound into peaceful days. Try this 10-minute routine tomorrow and notice how much quieter your mind feels before work. ☕✨",
    hashtags: "#MorningRoutine #MindfulProductivity #Focus"
  },
  {
    platform: "LinkedIn Post",
    icon: <Linkedin className="h-4 w-4 text-[#0A66C2]" />,
    height: "h-auto sm:mt-6",
    caption: "Most founders lose their focus before 9 AM by opening email first thing. Here is the 3-step morning sequence I use to stay proactive: 500ml water, physical priorities note, 2 mins sunlight.",
    hashtags: "#Leadership #Productivity #Habits"
  },
  {
    platform: "Twitter / X Thread",
    icon: <Twitter className="h-4 w-4 text-[#3D2B1F]" />,
    height: "h-auto",
    caption: "Stop starting your workday in panic mode. Rule 1: No notifications for 30 mins. Rule 2: Top 3 priorities on paper. Rule 3: 2 mins balcony sunlight.",
    hashtags: "#ProductivityHacks #CreatorLife"
  },
  {
    platform: "YouTube Shorts",
    icon: <Youtube className="h-4 w-4 text-[#FF0000]" />,
    height: "h-auto sm:-mt-4",
    caption: "Stop Starting Your Mornings in Panic Mode! Try this 10-minute reset sequence to double your deep work hours today.",
    hashtags: "#Shorts #MorningRoutine #Motivation"
  }
]

export default function CaptionsSection() {
  return (
    <section id="captions" className="w-full py-16 md:py-20 bg-[#FFF7F0] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/20">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-10 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Pinterest-Style Masonry Grid
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            Formatted copy for every network.
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium max-w-xl mx-auto">
            Captions adapt their tone, formatting, and hashtags for each social channel.
          </p>
        </div>

        {/* MASONRY GRID LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left max-w-5xl mx-auto">
          {masonryCaptions.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className={`rounded-3xl border border-[#8B5E3C]/20 bg-[#FAF7F2] p-5 shadow-lg space-y-3 flex flex-col justify-between ${item.height}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#8B5E3C]/15">
                  <span className="text-[10px] font-extrabold text-[#8B5E3C] uppercase tracking-widest flex items-center gap-1.5">
                    {item.icon}
                    {item.platform}
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#3D2B1F] leading-relaxed select-text">
                  {item.caption}
                </p>
              </div>

              <div className="pt-2 border-t border-[#8B5E3C]/10">
                <span className="text-[11px] font-bold text-[#8B5E3C] font-mono">
                  {item.hashtags}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
