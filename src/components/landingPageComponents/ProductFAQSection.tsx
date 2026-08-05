'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiChevronDown as ChevronDown,
  HiChevronUp as ChevronUp,
  HiQuestionMarkCircle as QuestionMark
} from 'react-icons/hi2'

const faqs = [
  {
    question: "Can I edit individual scenes in my storyboard?",
    answer: "Yes. Every scene card allows you to edit the duration, camera direction, visual actions, voiceover lines, and shooting tips directly inside your project workspace."
  },
  {
    question: "Can I regenerate or rewrite only one scene or hook?",
    answer: "Yes. You don't need to restart the entire project. You can click 'Rewrite Hook' or 'Regenerate Scene' on any specific card to get instant alternative angles."
  },
  {
    question: "Can I export or download my script and shoot plan?",
    answer: "Yes. You can export your full shoot plan as a formatted text file (`.txt`), copy individual voiceover segments with one click, or read directly in teleprompter mode."
  },
  {
    question: "Can I use my own language or local dialect?",
    answer: "Yes. Grovii supports multiple target languages including English, Hindi, Hinglish, Spanish, French, German, and more for both scripts and captions."
  },
  {
    question: "How does multi-platform content repurposing work?",
    answer: "Once your video shoot plan is created, Grovii automatically generates matching text copy optimized for Instagram Carousels, LinkedIn posts, Twitter/X threads, and YouTube Shorts descriptions."
  },
  {
    question: "Do I need special equipment to follow the shoot plan?",
    answer: "No. Every storyboard scene is designed for mobile creators using standard smartphones. The plans provide practical tips on natural lighting, camera position, and simple framing."
  }
]

export default function ProductFAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <section id="faq" className="w-full py-16 md:py-20 bg-[#FFF7F0] relative font-sans select-none border-b border-[#8B5E3C]/20">
      <div className="container mx-auto px-6 max-w-2xl space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Questions & Answers
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium">
            Everything you need to know about creating shoot plans with Grovii.
          </p>
        </div>

        {/* FAQ Accordion List (Narrow Editorial Column) */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 bg-[#FAF7F2] ${
                  isOpen ? 'border-[#8B5E3C]/40 shadow-xs' : 'border-[#8B5E3C]/15'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex justify-between items-center gap-4 hover:bg-[#FAF1E8] transition-colors"
                >
                  <span className="text-sm sm:text-base font-extrabold text-[#3D2B1F] flex items-center gap-2.5">
                    <QuestionMark className="h-4.5 w-4.5 text-[#8B5E3C] shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-[#8B5E3C] shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#5C4033]/60 shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-[#8B5E3C]/15 px-5 pb-5 pt-3 text-xs sm:text-sm text-[#5C4033] font-medium leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
