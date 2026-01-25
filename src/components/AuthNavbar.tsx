'use client'
import Link from "next/link"

export default function AuthNavbar() {
  return (
    <nav className="w-full fixed top-0 z-50 border-b bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            L
          </div>
          <span className="font-semibold text-xl hidden sm:inline-block">
            Logo
          </span>
        </Link>

      </div>
    </nav>
  )
}
