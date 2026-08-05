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
import { HiSparkles as Sparkles } from 'react-icons/hi2'

const networkNodes = [
  { name: "Instagram", icon: <Instagram className="h-5 w-5 text-[#E1306C]" />, pos: "sm:-translate-x-32 sm:-translate-y-20" },
  { name: "LinkedIn", icon: <Linkedin className="h-5 w-5 text-[#0A66C2]" />, pos: "sm:translate-x-32 sm:-translate-y-20" },
  { name: "Twitter / X", icon: <Twitter className="h-5 w-5 text-[#3D2B1F]" />, pos: "sm:-translate-x-32 sm:translate-y-20" },
  { name: "YouTube", icon: <Youtube className="h-5 w-5 text-[#FF0000]" />, pos: "sm:translate-x-32 sm:translate-y-20" }
]

export default function RepurposeSection() {
  return (
    <section id="repurpose" className="w-full py-16 md:py-20 bg-[#FFF7F0] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/20">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-12 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Network Visualization
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            One core idea, radiated everywhere.
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium max-w-xl mx-auto">
            Your single video shoot plan flows outward into native formats for every social network.
          </p>
        </div>

        {/* NETWORK VISUALIZATION ARCHITECTURE */}
        <div className="relative min-h-[320px] flex items-center justify-center pt-4">
          
          {/* Animated Pulsing Connecting Lines (SVG) */}
          <div className="hidden sm:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 600 300" fill="none">
              <line x1="300" y1="150" x2="150" y2="70" stroke="#8B5E3C" strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
              <line x1="300" y1="150" x2="450" y2="70" stroke="#8B5E3C" strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
              <line x1="300" y1="150" x2="150" y2="230" stroke="#8B5E3C" strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
              <line x1="300" y1="150" x2="450" y2="230" stroke="#8B5E3C" strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
            </svg>
          </div>

          {/* CENTER CORE NODE */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-28 h-28 rounded-full bg-[#8B5E3C] text-white flex flex-col items-center justify-center p-3 shadow-2xl relative z-20 text-center"
          >
            <Sparkles className="h-6 w-6 text-amber-300 animate-spin" />
            <span className="text-[11px] font-black uppercase tracking-wider mt-1">Idea Core</span>
          </motion.div>

          {/* 4 PLATFORM DESTINATION NODES */}
          {networkNodes.map((node, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className={`absolute p-3.5 rounded-2xl border-2 border-[#8B5E3C]/30 bg-[#FAF7F2] shadow-xl flex items-center gap-2.5 z-20 cursor-pointer ${node.pos}`}
            >
              <div className="p-2 rounded-xl bg-white shadow-xs">
                {node.icon}
              </div>
              <span className="text-xs font-black text-[#3D2B1F]">
                {node.name}
              </span>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}
