'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for trying out Grovii’s AI storyboard tools.',
    features: [
      '3 Storyboard generations/day',
      'Basic AI templates',
      'Community support',
    ],
    buttonText: 'Get Started',
    highlight: false,
  },
  {
    name: 'Creator',
    price: '$9/mo',
    description: 'Ideal for creators who post regularly.',
    features: [
      'Unlimited storyboards',
      'Custom styles & tones',
      'Access to trending audio insights',
      'Priority AI speed',
    ],
    buttonText: 'Join Creator Plan',
    highlight: true,
  },
  {
    name: 'Pro Studio',
    price: '$19/mo',
    description: 'For professional creators and small teams.',
    features: [
      'Team collaboration tools',
      'Export HD visuals',
      'Access to AI trend marketplace',
      'Early access to beta features',
    ],
    buttonText: 'Upgrade to Pro',
    highlight: false,
  },
]

const PricingSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-orange-50 to-white dark:from-background dark:to-muted/30 py-24 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto text-center space-y-10">
        {/* Heading */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Choose your{' '}
            <span className="bg-gradient-to-r from-[#8B5E3C] to-[#A47551] bg-clip-text text-transparent">
              Grovii Plan
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Whether you’re just starting out or creating daily, Grovii grows with you.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3 items-stretch">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col justify-between rounded-3xl shadow-xl border ${
                plan.highlight
                  ? 'border-[#8B5E3C] bg-gradient-to-b from-[#fff9f3] to-[#f8f1e9]'
                  : 'border-gray-200 bg-white/70'
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={`text-2xl font-semibold ${
                    plan.highlight
                      ? 'text-[#5C4033]'
                      : 'text-gray-800 dark:text-gray-100'
                  }`}
                >
                  {plan.name}
                </CardTitle>
                <p className="text-4xl font-extrabold mt-2 text-[#8B5E3C]">
                  {plan.price}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-base">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 flex-1">
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Check className="h-4 w-4 text-[#8B5E3C]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                  <Button
                    variant={plan.highlight ? 'brown' : 'outline'}
                    size="lg"
                    className={`w-full rounded-xl font-medium ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-[#8B5E3C] to-[#A47551] text-white shadow-lg hover:opacity-90'
                        : 'border-[#8B5E3C] text-[#8B5E3C] hover:bg-orange-50'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
