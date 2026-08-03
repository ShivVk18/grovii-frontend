'use client'

import React from "react"
import { motion } from "framer-motion"
import { HiViewColumns as LayoutTemplate, HiSparkles as Sparkles, HiArrowRight as ArrowRight } from "react-icons/hi2"
import { Button } from "@/components/ui/button"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as any

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
} as any

export default function TemplatesPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-7xl mx-auto h-[80vh] flex flex-col items-center justify-center font-sans select-none"
    >
      <motion.div variants={itemVariant} className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="w-24 h-24 rounded-[32px] glass-panel flex items-center justify-center relative z-10 border border-border shadow-2xl mx-auto mb-8">
          <LayoutTemplate className="w-10 h-10 text-primary" />
        </div>
      </motion.div>

      <motion.div variants={itemVariant} className="text-center space-y-4 max-w-lg relative z-10">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Template Marketplace</h1>
        <p className="text-muted-foreground leading-relaxed">
          Discover hundreds of premium storyboard templates, curated hooks, and cinematic layouts. Coming soon to Grovii.
        </p>
      </motion.div>

      <motion.div variants={itemVariant} className="flex items-center gap-4 relative z-10">
        <Button className="rounded-full h-12 px-8 font-bold shadow-xl transition-transform hover:scale-105 group">
          <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
          Join the Waitlist
        </Button>
        <Button variant="outline" className="rounded-full h-12 px-8 font-bold border-border bg-card/50 hover:bg-card shadow-sm transition-transform hover:scale-105 group">
          Preview Directory
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
