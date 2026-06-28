'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Flame, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { title: 'How It Works', href: '#how-it-works' },
  { title: 'Features', href: '#features' },
  { title: 'Pricing', href: '#pricing' },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-4 z-50 w-[95%] max-w-7xl mx-auto rounded-full transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-xl border border-[#8B5E3C]/15 shadow-lg shadow-[#8B5E3C]/5'
          : 'bg-white/70 backdrop-blur-md border border-[#8B5E3C]/10 shadow-md'
      }`}
    >
      <div className="flex h-14 items-center justify-between px-6 sm:px-8">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 select-none group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl brand-gradient text-white font-extrabold text-sm shadow-sm group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            G
          </div>
          <span className="font-extrabold text-lg text-[#5C4033] tracking-tight group-hover:text-[#8B5E3C] transition-colors duration-300">
            Grovii
          </span>
          <span className="text-[9px] font-extrabold text-[#8B5E3C] bg-[#8B5E3C]/10 px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
            AI
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((nav) => (
            <li key={nav.href}>
              <Link
                href={nav.href}
                className="text-xs font-bold text-[#5C4033]/60 hover:text-[#8B5E3C] transition-colors duration-200 uppercase tracking-wider"
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="rounded-full font-bold text-xs text-[#5C4033] hover:text-[#8B5E3C] hover:bg-[#8B5E3C]/8 transition-all">
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button size="sm" asChild className="rounded-full brand-gradient text-white font-bold text-xs px-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border-0">
            <Link href="/dashboard" className="flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5" />
              Get Started
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 hover:bg-[#8B5E3C]/8 rounded-xl transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5 text-[#5C4033]" /> : <Menu className="h-5 w-5 text-[#5C4033]" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-[#8B5E3C]/8 rounded-b-[24px]"
          >
            <div className="py-5 px-6 space-y-4 bg-[#FAF7F2]/95 backdrop-blur-xl">
              <ul className="flex flex-col gap-1">
                {navLinks.map((nav) => (
                  <li key={nav.href}>
                    <Link
                      href={nav.href}
                      className="block py-2.5 text-sm font-bold text-[#5C4033] hover:text-[#8B5E3C] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {nav.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2.5 pt-4 border-t border-[#8B5E3C]/10">
                <Button variant="ghost" size="sm" asChild className="w-full rounded-full font-bold text-[#5C4033]">
                  <Link href="/sign-in">Log in</Link>
                </Button>
                <Button size="sm" asChild className="w-full rounded-full brand-gradient text-white font-bold border-0">
                  <Link href="/dashboard" className="flex items-center justify-center gap-1.5">
                    <Flame className="h-4 w-4" />
                    Get Started Free
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
