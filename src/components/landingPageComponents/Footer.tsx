'use client'

import React from 'react'
import Link from 'next/link'
import { FaTwitter as Twitter, FaInstagram as Instagram, FaYoutube as Youtube, FaLinkedinIn as Linkedin } from "react-icons/fa6"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/60 bg-card py-16 text-muted-foreground select-none font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl space-y-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="space-y-4 max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 group select-none">
              <img
                src="/logo.png"
                alt="Grovii Logo"
                className="w-8 h-8 rounded-xl object-cover shadow-xs border border-primary/20"
              />
              <span className="font-extrabold text-base text-foreground tracking-tight">
                Grovii
              </span>
            </Link>

            <p className="text-xs leading-relaxed font-medium">
              A creative planning platform that transforms one idea into a complete, ready-to-shoot content plan.
            </p>

            <div className="flex gap-2">
              {[Twitter, Instagram, Youtube, Linkedin].map((Icon, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors cursor-pointer">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-16 text-xs font-medium">
            <div className="space-y-3">
              <h4 className="font-extrabold text-foreground uppercase text-[10px] tracking-widest">Platform Walkthrough</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">Workflow</a></li>
                <li><a href="#storyboard" className="hover:text-foreground transition-colors">Storyboard</a></li>
                <li><a href="#script" className="hover:text-foreground transition-colors">Voiceover Script</a></li>
                <li><a href="#captions" className="hover:text-foreground transition-colors">Captions & Music</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-extrabold text-foreground uppercase text-[10px] tracking-widest">Workspace</h4>
              <ul className="space-y-2">
                <li><a href="#repurpose" className="hover:text-foreground transition-colors">Multi-Platform Repurpose</a></li>
                <li><a href="#faq" className="hover:text-foreground transition-colors">Product FAQ</a></li>
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Launch App</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
          <span>© {year} Grovii Inc. All rights reserved.</span>
          <span className="flex items-center gap-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Services Operational
          </span>
        </div>

      </div>
    </footer>
  )
}

export default Footer
