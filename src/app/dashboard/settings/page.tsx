'use client'

import React from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, CreditCard, AlertTriangle, ShieldCheck } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
}

export default function SettingsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-4xl font-sans select-none mx-auto"
    >
      
      <motion.div variants={itemVariant}>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal branding presets, subscription plan, and integration keys</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div variants={itemVariant} className="glass-panel rounded-3xl border border-border p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-row items-center gap-4 pb-6 border-b border-border">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Profile Information</h2>
            <p className="text-xs text-muted-foreground font-medium">Your public creator credentials</p>
          </div>
        </div>

        <div className="space-y-6 pt-6 select-text relative z-10">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-foreground">Creator Handle / Name</Label>
              <Input 
                defaultValue="Shivansh" 
                className="rounded-xl border-border bg-background focus:ring-primary/20 text-sm h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-foreground">Primary Email Address</Label>
              <Input 
                defaultValue="shiv@example.com" 
                disabled 
                className="rounded-xl border-border bg-muted/50 text-muted-foreground text-sm h-11 cursor-not-allowed"
              />
            </div>
          </div>

          <Button className="rounded-full font-bold text-sm px-8 py-6 shadow-md transition-transform hover:scale-[1.02]">
            Save Changes
          </Button>
        </div>
      </motion.div>

      {/* Plan Section */}
      <motion.div variants={itemVariant} className="glass-panel rounded-3xl border border-border p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-row items-center gap-4 pb-6 border-b border-border">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Subscription Plan</h2>
            <p className="text-xs text-muted-foreground font-medium">Unlock full premium layout generations</p>
          </div>
        </div>

        <div className="space-y-8 pt-6 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 bg-secondary/50 p-6 rounded-2xl border border-border">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Current Tier</p>
              <div className="flex items-center gap-3 mt-2">
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight">Free Trial Plan</h3>
                <Badge className="bg-primary text-primary-foreground font-bold rounded-md px-2 py-0.5">
                  Active
                </Badge>
              </div>
            </div>

            <Button variant="outline" className="rounded-full border-primary/20 text-foreground hover:bg-primary/10 font-bold text-sm px-6 py-6 shadow-sm transition">
              Upgrade to Pro
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-foreground">Weekly Storyboard Allocations</span>
              <span className="font-bold text-primary">3 / 5 generations used</span>
            </div>

            <div className="w-full bg-secondary rounded-full h-3 overflow-hidden border border-border/50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-primary h-full rounded-full" 
              />
            </div>
            
            <p className="text-xs text-muted-foreground font-medium leading-relaxed mt-2">
              Reset occurs every Monday. Upgrade to Pro for unlimited canvas storyboards and cinematic scene drafts.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div variants={itemVariant} className="glass-panel rounded-3xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-row items-center gap-4 pb-6 border-b border-destructive/10">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-destructive">Danger Zone</h2>
            <p className="text-xs text-destructive/70 font-medium">Critical destructive actions</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 pt-6 select-text">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Permanently delete your personal workspace, auto-generated script histories, and active storyboards. This action is irreversible.
          </p>

          <Button variant="destructive" className="rounded-full font-bold text-sm px-6 py-6 shrink-0 transition-transform hover:scale-[1.02]">
            Delete Account
          </Button>
        </div>
      </motion.div>

    </motion.div>
  )
}
