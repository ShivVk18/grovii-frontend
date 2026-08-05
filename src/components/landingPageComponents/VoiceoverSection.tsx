'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../ui/badge'
import { HiDocumentText as FileText } from 'react-icons/hi2'

const scriptLines = [
  { scene: "01", text: "Stop starting your workday in panic mode. Here is the 10-minute reset." },
  { scene: "02", text: "Most productive days begin before everyone else wakes up." },
  { scene: "03", text: "Step one: 500ml cold water before touching any phone notifications." },
  { scene: "04", text: "Step two: Write down the top 3 non-negotiables for today in a paper notebook." },
  { scene: "05", text: "Step three: Spend 2 minutes outdoors in natural sunlight." }
]

export default function VoiceoverSection() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % scriptLines.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="script" className="w-full py-16 md:py-20 bg-[#FAF7F2] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/20">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-10 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Script Document Layout
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            Read directly while filming.
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium max-w-xl mx-auto">
            Printed script page aesthetic with active line highlighting and teleprompter precision.
          </p>
        </div>

        {/* PRINTED SCRIPT PAPER PAGE LAYOUT */}
        <div className="max-w-2xl mx-auto relative">
          
          <div className="rounded-[28px] border border-[#8B5E3C]/25 bg-[#FFF7F0] p-6 sm:p-10 shadow-xl text-left relative overflow-hidden font-mono text-sm leading-relaxed">
            
            {/* Red/Brown Margin Line (Script Page Aesthetic) */}
            <div className="absolute top-0 bottom-0 left-12 sm:left-16 w-0.5 bg-[#8B5E3C]/30" />

            {/* Script Document Title */}
            <div className="pl-8 sm:pl-12 pb-4 border-b border-[#8B5E3C]/15 mb-6 flex justify-between items-center text-xs font-bold text-[#8B5E3C]">
              <span>GROVII_VOICEOVER_SCRIPT_V1.TXT</span>
              <span>PAGE 1 OF 1</span>
            </div>

            {/* Lines List */}
            <div className="pl-8 sm:pl-12 space-y-4">
              {scriptLines.map((line, idx) => {
                const isActive = activeIdx === idx
                return (
                  <motion.div
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    animate={{ scale: isActive ? 1.02 : 1 }}
                    className={`p-3 rounded-xl transition-all cursor-pointer relative ${
                      isActive
                        ? "bg-[#FAF1E8] border border-[#8B5E3C]/40 text-[#3D2B1F] font-bold shadow-xs"
                        : "text-[#5C4033]/60 hover:text-[#3D2B1F]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-extrabold text-[#8B5E3C] uppercase tracking-wider pt-0.5 shrink-0">
                        [{line.scene}]
                      </span>
                      <p className="flex-1 leading-relaxed">
                        “{line.text}”
                        {isActive && (
                          <span className="inline-block w-2 h-4 bg-[#8B5E3C] ml-1.5 animate-pulse align-middle" />
                        )}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
