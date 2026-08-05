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
    answer: "Yes. Every scene card allows you to edit the duration, camera direction, visual actions, voiceover lines, and shooting tips directly inside your dashboard."
  },
  {
    question: "Can I regenerate or rewrite only one scene or hook?",
    answer: "Yes. You don't need to restart the entire project. You can click 'Rewrite Hook' or 'Regenerate Scene' on any specific card to get instant alternative angles."
  },
  {
    question: "Can I export or download my script and shoot plan?",
    answer: "Yes. You can export your full shoot plan as a formatted text file (`.txt`), copy individual voiceover segments with one click, or send them to your mobile teleprompter app."
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
    <section id="faq" className="w-full py-20 bg-background relative font-sans select-none border-b border-border/60">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-primary/5 rounded-full px-3.5 py-1">
            Product Questions & Answers
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            Everything you need to know about creating shoot plans with Grovii.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className={`glass-panel border rounded-2xl overflow-hidden transition-all duration-200 bg-card ${
                  isOpen ? 'border-primary/30 shadow-xs' : 'border-border'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-secondary/40 transition-colors"
                >
                  <span className="text-base font-extrabold text-foreground flex items-center gap-2.5">
                    <QuestionMark className="h-5 w-5 text-primary shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border/50 px-5 pb-5 pt-3 text-sm text-muted-foreground font-medium leading-relaxed"
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
