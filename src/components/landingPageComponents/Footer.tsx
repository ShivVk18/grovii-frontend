'use client'

import React from 'react'
import Link from 'next/link'
import { HiFilm as Clapperboard } from "react-icons/hi2"
import { FaTwitter as Twitter, FaInstagram as Instagram, FaYoutube as Youtube, FaLinkedinIn as Linkedin } from "react-icons/fa6"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/60 bg-card py-16 text-muted-foreground select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl space-y-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="space-y-4 max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 group select-none">
              <img
                src="/logo.png"
                alt="Grovii Logo"
                className="w-8 h-8 rounded-xl object-cover shadow-md border border-[#8B5E3C]/20"
              />
              <span className="font-bold text-base text-foreground tracking-tight flex items-center gap-1.5">
                Grovii <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-secondary text-foreground uppercase tracking-widest border border-border">Studio</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed">
              The intelligent creative studio for short-form video creators, growth marketers, and agencies.
            </p>

            <div className="flex gap-2">
              {[Twitter, Instagram, Youtube, Linkedin].map((Icon, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors cursor-pointer">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-16 text-xs">
            <div className="space-y-3">
              <h4 className="font-bold text-foreground uppercase text-[10px] tracking-widest">Studio</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#demo" className="hover:text-foreground transition-colors">Studio Demo</a></li>
                <li><a href="#shots" className="hover:text-foreground transition-colors">Shoot Plan</a></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-foreground uppercase text-[10px] tracking-widest">Product</h4>
              <ul className="space-y-2">
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing Plans</a></li>
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Studio Workspace</Link></li>
                <li><Link href="/sign-in" className="hover:text-foreground transition-colors">Sign In</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
          <span>© {year} Grovii Inc. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Studio Services Operational
          </span>
        </div>

      </div>
    </footer>
  )
}

export default Footer
