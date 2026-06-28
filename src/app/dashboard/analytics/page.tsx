'use client'

import React from "react"
import { motion } from "framer-motion"
import { LineChart, BarChart3, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
}

export default function AnalyticsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-7xl mx-auto h-[80vh] flex flex-col items-center justify-center font-sans select-none"
    >
      <motion.div variants={itemVariant} className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="w-24 h-24 rounded-[32px] glass-panel flex items-center justify-center relative z-10 border border-border shadow-2xl mx-auto mb-8 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <LineChart className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
        </div>
      </motion.div>

      <motion.div variants={itemVariant} className="text-center space-y-4 max-w-lg relative z-10">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Performance Analytics</h1>
        <p className="text-muted-foreground leading-relaxed">
          Track views, retention graphs, and conversion metrics directly connected to your generated storyboards.
        </p>
      </motion.div>

      <motion.div variants={itemVariant} className="flex items-center gap-4 relative z-10 pt-4">
        <Button className="rounded-full h-12 px-8 font-bold shadow-xl transition-transform hover:scale-105 group">
          <TrendingUp className="w-4 h-4 mr-2 group-hover:animate-bounce" />
          Connect Accounts
        </Button>
        <Button variant="outline" className="rounded-full h-12 px-8 font-bold border-border bg-card/50 hover:bg-card shadow-sm transition-transform hover:scale-105">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Sample Data
        </Button>
      </motion.div>
    </motion.div>
  )
}
