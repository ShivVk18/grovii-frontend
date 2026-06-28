'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Check, Flame, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { features } from 'process'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    priceNote: 'forever',
    description: "Perfect for trying out Grovii's AI storyboard tools.",
    features: [
      '3 Storyboard generations / day',
      'Basic AI scene templates',
      'Community support',
      '9:16 canvas workspace',
    ],
    cta: 'Get Started Free',
    href: '/dashboard',
    highlight: false,
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    name: 'Creator',
    price: '$9',
    priceNote: '/ month',
    description: 'Ideal for creators who post regularly and want full AI power.',
    features: [
      'Unlimited storyboard generations',
      'Custom styles & tone presets',
      'Trending audio insights',
      'Priority AI generation speed',
      'Export scene scripts as PDF',
    ],
    cta: 'Join Creator Plan',
    href: '/dashboard',
    highlight: true,
    icon: <Flame className="w-5 h-5" />,
  },
  {
    name: 'Pro Studio',
    price: '$19',
    priceNote: '/ month',
    description: 'For professional creators, agencies, and small teams.',
    features: [
      'Everything in Creator',
      'Team collaboration tools',
      'Export HD visual assets',
      'AI trend marketplace access',
      'Early beta feature access',
    ],
    cta: 'Upgrade to Pro',
    href: '/dashboard',
    highlight: false,
    icon: <Zap className="w-5 h-5" />,
  },
]

const PricingSection = () => {
  return (
    <section id="pricing" className="w-full py-28 select-none relative overflow-hidden">

      {/* bg decorations */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B5E3C]/15 to-transparent" />
      <div className="absolute top-10 left-1/3 w-[500px] h-[400px] bg-gradient-to-br from-[#F5DFC0]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B5E3C]/8 border border-[#8B5E3C]/15 text-xs font-bold text-[#8B5E3C] mb-2">
            Simple Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3D2B1F] tracking-tight">
            Choose your{' '}
            <span className="brand-gradient-text">Grovii Plan</span>
          </h2>
          <p className="text-[#7A5C45]/75 text-base font-medium leading-relaxed">
            Whether you're just starting out or creating daily, Grovii grows with you.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
              className={`relative flex flex-col rounded-[28px] border overflow-hidden transition-all duration-500 ${
                plan.highlight
                  ? 'border-[#8B5E3C]/40 bg-gradient-to-b from-[#FFF7F0] to-[#FAF1E8] shadow-xl shadow-[#8B5E3C]/12 scale-[1.04] z-10'
                  : 'border-[#8B5E3C]/10 bg-white/75 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-1.5'
              }`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] font-extrabold tracking-wider uppercase brand-gradient text-white px-3 py-1.5 rounded-full shadow-md">
                  <Flame className="h-3 w-3 fill-white" />
                  Most Popular
                </div>
              )}

              {/* Top accent line for highlighted */}
              {plan.highlight && (
                <div className="h-1 w-full brand-gradient" />
              )}

              <div className="p-7 flex flex-col flex-1 gap-6">
                {/* Plan info */}
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    plan.highlight ? 'brand-gradient text-white shadow-md' : 'bg-[#8B5E3C]/8 text-[#8B5E3C]'
                  }`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#3D2B1F]">{plan.name}</h3>
                    <p className="text-[#7A5C45]/70 text-xs font-medium mt-1 leading-relaxed">{plan.description}</p>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-[#8B5E3C] tracking-tight">{plan.price}</span>
                    <span className="text-sm text-[#8B5E3C]/60 font-semibold">{plan.priceNote}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#8B5E3C]/8" />

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm text-[#5C4033]/80 font-medium">
                      <div className="w-5 h-5 rounded-full bg-[#8B5E3C]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-[#8B5E3C] stroke-[3]" />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  className={`w-full rounded-full py-6 font-extrabold text-sm transition-all duration-300 border-0 ${
                    plan.highlight
                      ? 'brand-gradient text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                      : 'bg-white border border-[#8B5E3C]/25 text-[#8B5E3C] hover:bg-[#8B5E3C]/5 hover:border-[#8B5E3C]/40'
                  }`}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs font-semibold text-[#7A5C45]/60"
        >
          No credit card required · Cancel anytime · 14-day free trial on paid plans
        </motion.p>
      </div>
    </section>
  )
}

export default PricingSection
