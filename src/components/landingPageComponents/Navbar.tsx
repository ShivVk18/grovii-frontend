'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Flame, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navOption = [
    { title: 'How It Works', scrollLink: '/howitworks' },
    { title: 'Features', scrollLink: '/features' },
    { title: 'Pricing', scrollLink: '/pricing' },
    { title: 'Get Started', scrollLink: '/get-started' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            L
          </div>
          <span className="font-semibold text-xl hidden sm:inline-block">Logo</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navOption.slice(0, 3).map((nav) => (
            <li key={nav.scrollLink}>
              <Link
                href={nav.scrollLink}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button
                size="sm"
                asChild
               
                className="bg-[#8B5E3C] text-white hover:bg-[#6E4D41] dark:bg-[#5A3B2A] dark:hover:bg-[#4B2E1F]"
              >
                <Link href="/sign-up">
                  <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                  Get Started
                </Link>
              </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background animate-slide-down">
          <div className="container py-4 px-4">
            <ul className="flex flex-col gap-4">
              {navOption.map((nav) => (
                <li key={nav.scrollLink}>
                  <Link
                    href={nav.scrollLink}
                    className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                asChild
                variant='brown'
                className="w-full flex items-center justify-center gap-1  text-white"
              >
                <Link href="/get-started">
                  <Flame className="h-4 w-4 text-orange-500" />
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
