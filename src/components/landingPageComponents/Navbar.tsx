'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { HiFilm as Clapperboard, HiBars3 as Menu, HiXMark as X, HiArrowRight as ArrowRight } from "react-icons/hi2"
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { title: 'Workflow', href: '#how-it-works' },
  { title: 'Storyboard', href: '#storyboard' },
  { title: 'Script', href: '#script' },
  { title: 'Captions & Music', href: '#music' },
  { title: 'Repurpose', href: '#repurpose' },
  { title: 'FAQ', href: '#faq' },
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
          ? 'bg-[#FFF7F0]/90 backdrop-blur-xl border border-[#8B5E3C]/20 shadow-xl'
          : 'bg-[#FFF7F0]/70 backdrop-blur-md border border-[#8B5E3C]/10 shadow-sm'
      }`}
    >
      <div className="flex h-14 items-center justify-between px-6 sm:px-8">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 select-none group">
          <img
            src="/logo.png"
            alt="Grovii Logo"
            className="w-8 h-8 rounded-xl object-cover shadow-md border border-[#8B5E3C]/20 group-hover:scale-105 transition-transform duration-300"
          />
          <span className="font-extrabold text-base text-[#3D2B1F] tracking-tight">
            Grovii
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((nav) => (
            <li key={nav.href}>
              <Link
                href={nav.href}
                className="text-xs font-semibold text-[#5C4033]/80 hover:text-[#8B5E3C] transition-colors duration-200 uppercase tracking-wider"
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="rounded-full font-semibold text-xs text-[#5C4033] hover:text-[#8B5E3C]">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button size="sm" asChild className="rounded-full font-bold text-xs px-5 shadow-md bg-gradient-to-r from-[#8B5E3C] to-[#C48B5E] text-white hover:opacity-95 transition-all">
            <Link href="/dashboard" className="flex items-center gap-1.5 group">
              Start Creating
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 hover:bg-[#F5DFC0]/30 rounded-xl transition-colors text-[#3D2B1F]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-[#8B5E3C]/20 rounded-b-[24px]"
          >
            <div className="py-5 px-6 space-y-4 bg-[#FFF7F0]/95 backdrop-blur-xl">
              <ul className="flex flex-col gap-2">
                {navLinks.map((nav) => (
                  <li key={nav.href}>
                    <Link
                      href={nav.href}
                      className="block py-2 text-sm font-semibold text-[#3D2B1F] hover:text-[#8B5E3C] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {nav.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2.5 pt-4 border-t border-[#8B5E3C]/20">
                <Button variant="ghost" size="sm" asChild className="w-full rounded-full font-semibold text-[#5C4033]">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button size="sm" asChild className="w-full rounded-full font-bold bg-gradient-to-r from-[#8B5E3C] to-[#C48B5E] text-white">
                  <Link href="/dashboard" className="flex items-center justify-center gap-1.5">
                    Start Creating
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
