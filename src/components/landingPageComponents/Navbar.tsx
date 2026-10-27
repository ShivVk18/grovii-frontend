'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { HiBars3 as Menu, HiXMark as X, HiArrowRight as ArrowRight } from "react-icons/hi2"
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { title: 'Workflow', href: '#how-it-works' },
  { title: 'Workspace', href: '#preview' },
  { title: 'Creator Toolkit', href: '#toolkit' },
]

export default function Navbar() {
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
      className={`sticky top-4 z-50 w-[94%] max-w-6xl mx-auto rounded-2xl transition-all duration-300 select-none ${
        scrolled
          ? 'bg-card/90 backdrop-blur-xl border border-border shadow-md'
          : 'bg-card/70 backdrop-blur-md border border-border/80 shadow-xs'
      }`}
    >
      <div className="flex h-14 items-center justify-between px-6 sm:px-8">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-sm shadow-xs transition-transform duration-200 group-hover:scale-105">
            G
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-foreground tracking-tight leading-none">
              Grovii
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              AI Director
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((nav) => (
            <li key={nav.href}>
              <Link
                href={nav.href}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-2 transition-colors"
          >
            Sign In
          </Link>
          <Button
            size="sm"
            asChild
            className="rounded-xl h-9 px-4 bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 gap-1.5"
          >
            <Link href="/dashboard/create">
              <span>Start Directing</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 text-muted-foreground hover:text-foreground rounded-lg"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border px-6 py-4 space-y-3 bg-card rounded-b-2xl"
          >
            <ul className="space-y-2">
              {navLinks.map((nav) => (
                <li key={nav.href}>
                  <Link
                    href={nav.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-xs font-semibold text-muted-foreground hover:text-foreground py-1"
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-border/60 flex flex-col gap-2">
              <Link
                href="/sign-in"
                className="text-xs font-semibold text-center text-muted-foreground py-2"
              >
                Sign In
              </Link>
              <Button
                size="sm"
                asChild
                className="w-full rounded-xl h-10 bg-primary text-primary-foreground font-bold text-xs"
              >
                <Link href="/dashboard/create">
                  Start Directing Free
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
