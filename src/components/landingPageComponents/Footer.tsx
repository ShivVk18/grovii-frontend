'use client'
import React from 'react'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#fff9f3] to-[#f8f1e9] dark:from-background dark:to-muted/20 text-gray-700 dark:text-gray-300 border-t border-[#8B5E3C]/20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          
         
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#8B5E3C] to-[#A47551] bg-clip-text text-transparent">
                Grovii
              </span>{' '}
              🌱
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm text-sm">
              Empowering creators to visualize and grow their ideas — faster, smarter, and beautifully.
            </p>
          </div>

          {/* Middle Section - Links */}
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-6 text-sm">
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <h4 className="font-semibold text-[#5C4033]">Product</h4>
              <a href="#" className="hover:text-[#8B5E3C] transition">Features</a>
              <a href="#" className="hover:text-[#8B5E3C] transition">Pricing</a>
              <a href="#" className="hover:text-[#8B5E3C] transition">FAQs</a>
            </div>
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <h4 className="font-semibold text-[#5C4033]">Company</h4>
              <a href="#" className="hover:text-[#8B5E3C] transition">About</a>
              <a href="#" className="hover:text-[#8B5E3C] transition">Blog</a>
              <a href="#" className="hover:text-[#8B5E3C] transition">Contact</a>
            </div>
          </div>

          {/* Right Section - Social Icons */}
          <div className="flex justify-center md:justify-end gap-5">
            <a href="#" aria-label="Twitter" className="hover:text-[#8B5E3C] transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#8B5E3C] transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#8B5E3C] transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-[#8B5E3C] transition">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="my-10 border-t border-[#8B5E3C]/20"></div>

        {/* Bottom Text */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} <span className="font-semibold text-[#8B5E3C]">Grovii</span>. 
          Built with ❤️ for creators worldwide.
        </div>
      </div>
    </footer>
  )
}

export default Footer
