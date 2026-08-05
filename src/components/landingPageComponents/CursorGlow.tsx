'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })

  const cursorX = useSpring(-100, { damping: 25, stiffness: 200 })
  const cursorY = useSpring(-100, { damping: 25, stiffness: 200 })

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', updateMouse)
    return () => window.removeEventListener('mousemove', updateMouse)
  }, [cursorX, cursorY])

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="pointer-events-none fixed z-30 w-72 h-72 rounded-full bg-[#8B5E3C]/10 blur-[90px] transition-opacity duration-300 hidden md:block"
    />
  )
}
