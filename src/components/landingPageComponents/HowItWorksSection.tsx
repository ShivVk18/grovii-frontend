'use client'
import React from 'react'
import { Lightbulb, Cog, Clapperboard } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'

const steps = [
  {
    icon: <Lightbulb className="w-8 h-8 text-orange-400" />,
    title: 'Type your idea',
    desc: "Describe your concept — short or detailed, we'll understand it.",
  },
  {
    icon: <Cog className="w-8 h-8 text-rose-400" />,
    title: 'AI generates scenes',
    desc: 'AI converts your idea into storyboard-style scenes with camera angles.',
  },
  {
    icon: <Clapperboard className="w-8 h-8 text-amber-400" />,
    title: 'You create',
    desc: 'Use AI-powered ideas to shoot, edit, and bring your vision to life.',
  },
]

const HowItWorksSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-neutral-50 to-orange-50/30 dark:from-background dark:to-muted/30 py-24 flex justify-center">
      <div className="container mx-auto flex flex-col items-center justify-center px-6 md:px-12 lg:px-20">
        
        {/* Modern Container with Glass Effect */}
        <div className="w-full bg-gradient-to-br from-[#5C4033]/95 via-[#6B4423]/95 to-[#8B5E3C]/95 rounded-3xl p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,152,0,0.08),transparent_50%)] pointer-events-none"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl"></div>
          
          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 text-white relative z-10 tracking-tight">
            How It Works
          </h2>
          <p className="text-center text-orange-200/80 text-lg mb-16 relative z-10 max-w-2xl mx-auto">
            Transform your creative vision into reality in three simple steps
          </p>
          
          {/* Steps Container */}
          <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-8 z-10">
            
            {/* Connector line with gradient */}
            <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="relative group flex-1 max-w-xs">
                {/* Step number badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-white font-bold text-sm shadow-lg z-20 group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                
                <Card className="h-full bg-[#2A1810]/80 backdrop-blur-md border-2 border-orange-300/20 text-white shadow-xl hover:shadow-2xl hover:border-orange-300/40 transition-all duration-500 group-hover:-translate-y-2 relative overflow-hidden">
                  {/* Card gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="flex flex-col items-center justify-center space-y-4 pt-8 relative z-10">
                    <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B5E3C]/50 to-[#A47551]/50 backdrop-blur-sm shadow-lg border border-orange-300/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {step.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-orange-100 text-center group-hover:text-white transition-colors duration-300">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8 relative z-10">
                    <CardDescription className="text-center text-orange-200/70 text-base leading-relaxed group-hover:text-orange-100/90 transition-colors duration-300">
                      {step.desc}
                    </CardDescription>
                  </CardContent>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection