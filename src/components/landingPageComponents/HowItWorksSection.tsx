'use client'

import React from 'react'
import { Lightbulb, Cog, Clapperboard } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: <Lightbulb className="w-6 h-6 text-[#8B5E3C]" />,
    number: '01',
    title: 'Type your idea',
    desc: "Describe your concept — short or detailed. Our AI understands context, tone, and your target audience instantly.",
    badge: 'Input',
  },
  {
    icon: <Cog className="w-6 h-6 text-[#8B5E3C]" />,
    number: '02',
    title: 'AI generates scenes',
    desc: 'AI converts your idea into cinematic storyboard scenes, complete with camera angles, script, and timing cues.',
    badge: 'Generate',
  },
  {
    icon: <Clapperboard className="w-6 h-6 text-[#8B5E3C]" />,
    number: '03',
    title: 'You create',
    desc: 'Use AI-powered storyboards to shoot, edit, and bring your vision to life — faster than ever before.',
    badge: 'Create',
  },
]

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="w-full py-28 select-none relative overflow-hidden">

      {/* bg decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,223,192,0.25),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl space-y-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B5E3C]/8 border border-[#8B5E3C]/15 text-xs font-bold text-[#8B5E3C] mb-2">
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3D2B1F] tracking-tight">
            How It{' '}
            <span className="brand-gradient-text">Works</span>
          </h2>
          <p className="text-[#7A5C45]/75 text-base font-medium leading-relaxed">
            Transform your creative vision into reality in three intentional steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-6 md:gap-8 items-stretch z-10">

          {/* Connector line */}
          <div className="hidden md:block absolute top-[72px] left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-[#8B5E3C]/20 to-transparent pointer-events-none" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
              className="group relative"
            >
              {/* Step number badge */}
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-full brand-gradient flex items-center justify-center text-white text-xs font-black shadow-lg z-20 group-hover:scale-110 transition-transform duration-300">
                {index + 1}
              </div>

              <div className="h-full bg-white/75 backdrop-blur-md border border-[#8B5E3C]/10 rounded-[24px] p-7 pt-8 shadow-sm hover:shadow-lg hover:border-[#8B5E3C]/25 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col gap-4 text-left">

                {/* card bg glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,94,60,0.04),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF1E8] border border-[#8B5E3C]/12 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-extrabold text-[#8B5E3C]/60 bg-[#8B5E3C]/8 px-3 py-1 rounded-full uppercase tracking-wider">
                    {step.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-[#3D2B1F] tracking-tight group-hover:text-[#8B5E3C] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[#7A5C45]/75 text-sm leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom hover bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] brand-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-[24px]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection