'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-[#8B5E3C]/10 relative overflow-hidden">

      {/* bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] to-[#FFF7F0] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B5E3C]/15 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5 max-w-xs"
          >
            <Link href="/" className="flex items-center gap-2.5 group select-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl brand-gradient text-white font-extrabold text-base shadow-md group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                G
              </div>
              <span className="font-extrabold text-xl text-[#5C4033] tracking-tight">Grovii</span>
              <span className="text-[9px] font-extrabold text-[#8B5E3C] bg-[#8B5E3C]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">AI</span>
            </Link>
            <p className="text-[#7A5C45]/70 text-sm leading-relaxed font-medium">
              Empowering creators to visualize and grow their ideas — faster, smarter, and more beautifully than ever.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { icon: <Twitter className="w-4 h-4" />, label: 'Twitter' },
                { icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
                { icon: <Youtube className="w-4 h-4" />, label: 'YouTube' },
                { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/80 border border-[#8B5E3C]/12 flex items-center justify-center text-[#8B5E3C]/60 hover:text-[#8B5E3C] hover:border-[#8B5E3C]/30 hover:bg-[#8B5E3C]/5 shadow-sm transition-all duration-300 hover:scale-110"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-row gap-16"
          >
            {[
              {
                heading: 'Product',
                links: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
              },
              {
                heading: 'Company',
                links: ['About', 'Blog', 'Careers', 'Contact'],
              },
              {
                heading: 'Legal',
                links: ['Privacy', 'Terms', 'Cookie Policy'],
              },
            ].map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-3">
                <h4 className="text-[10px] font-extrabold text-[#8B5E3C] uppercase tracking-widest">{heading}</h4>
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm font-semibold text-[#7A5C45]/70 hover:text-[#8B5E3C] transition-colors duration-200"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-[#8B5E3C]/12 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-[#7A5C45]/50">
          <span>© {year} <span className="text-[#8B5E3C] font-bold">Grovii</span>. Built with ❤️ for creators worldwide.</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
