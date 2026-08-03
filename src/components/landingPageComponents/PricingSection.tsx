'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiClock as Clock, HiSparkles as Sparkles, HiArrowRight as ArrowRight, HiCheckCircle as CheckCircle2 } from "react-icons/hi2"
import { Button } from '../ui/button'
import Link from 'next/link'
import { toast } from 'sonner'

export default function PricingSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    toast.success("You've been added to the VIP subscription early access list!")
  }

  return (
    <section id="pricing" className="py-24 relative overflow-hidden border-t border-[#8B5E3C]/20 select-none">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-8 sm:p-12 border border-[#8B5E3C]/25 bg-gradient-to-br from-[#FFF7F0] via-[#FAF7F2] to-[#FFF7F0] shadow-2xl relative overflow-hidden text-center space-y-8"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#F5DFC0]/60 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#8B5E3C]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B5E3C] text-white text-xs font-bold shadow-md">
            <Clock className="h-4 w-4 animate-spin" /> Subscriptions Coming Soon
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#3D2B1F] tracking-tight">
              Paid Tiers & Automated Billing Launching Soon
            </h2>
            <p className="text-[#5C4033] text-base leading-relaxed">
              We are finalizing our Stripe billing integration. In the meantime, all creators get <strong className="text-[#8B5E3C]">100% free unlimited access</strong> to the Grovii Studio Workspace.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
            <div className="p-4 rounded-2xl bg-[#FFF7F0] border border-[#8B5E3C]/15 space-y-1">
              <span className="text-xs font-bold text-[#8B5E3C] flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Free Studio Access
              </span>
              <p className="text-[11px] text-[#5C4033]/80">Create unlimited storyboards right now with zero cost.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF7F0] border border-[#8B5E3C]/15 space-y-1">
              <span className="text-xs font-bold text-[#8B5E3C] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> VIP Launch Discount
              </span>
              <p className="text-[11px] text-[#5C4033]/80">Get 50% off Pro Studio tiers when paid billing opens.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF7F0] border border-[#8B5E3C]/15 space-y-1">
              <span className="text-xs font-bold text-[#8B5E3C] flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Early Access
              </span>
              <p className="text-[11px] text-[#5C4033]/80">Be the first to unlock priority generation channels.</p>
            </div>
          </div>

          {/* Notification Form */}
          <div className="pt-4 max-w-md mx-auto space-y-4">
            {!subscribed ? (
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for early access..."
                  required
                  className="flex-1 px-4 py-3.5 rounded-full border border-[#8B5E3C]/30 bg-white text-xs font-medium text-[#3D2B1F] placeholder:text-[#5C4033]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full font-bold text-xs px-6 py-3.5 bg-gradient-to-r from-[#8B5E3C] to-[#C48B5E] text-white shadow-md hover:opacity-95"
                >
                  Notify Me
                </Button>
              </form>
            ) : (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-800">
                ✓ You're on the early access notification list!
              </div>
            )}

            <Button
              asChild
              variant="link"
              className="text-xs font-bold text-[#8B5E3C] hover:text-[#3D2B1F]"
            >
              <Link href="/dashboard" className="inline-flex items-center gap-1">
                Start Creating Free in Studio Workspace
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
