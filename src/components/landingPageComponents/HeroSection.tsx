'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Flame } from 'lucide-react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-orange-50 dark:from-background dark:to-muted/30 py-24">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16 px-6 md:px-12 lg:px-20">
        
       
        <div className="flex-1 text-center lg:text-left space-y-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            Turn your{' '}
            <span className="bg-gradient-to-r from-[#8B5E3C] to-[#A47551] bg-clip-text text-transparent">
              ideas
            </span>{' '}
            into ready-to-shoot <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#5C4033] to-[#8B5E3C] bg-clip-text text-transparent">Reels</span> in seconds
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Create, customize, and generate scroll-stopping video scripts with AI —
            all in one place, designed for creators who want speed and quality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              variant='brown'
              className="flex items-center gap-2 text-white rounded-xl shadow-lg px-6 py-5"
            >
              <Flame className="h-5 w-5 text-white" />
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl border border-[#8B5E3C] text-[#8B5E3C] hover:bg-orange-50 px-6 py-5"
            >
              Learn More
            </Button>
          </div>
        </div>

        
        <div className="flex-1 flex justify-center">
          <div className="relative w-[320px] sm:w-[420px] lg:w-[520px] aspect-square">
            <Image
              src="https://res.cloudinary.com/dtee0d1tu/image/upload/v1762498626/page_jni4lf.png"
              alt="Content Creator Working"
              width={520}
              height={520}
              className="object-cover rounded-3xl drop-shadow-2xl border border-gray-200/30"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
