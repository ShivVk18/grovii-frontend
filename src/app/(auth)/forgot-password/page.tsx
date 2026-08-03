'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HiExclamationCircle as AlertCircle, HiKey as KeyRound, HiArrowLeft as ArrowLeft, HiEnvelopeOpen as MailCheck } from "react-icons/hi2";

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setError(null);
    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-background text-foreground">
      {/* ── Ambient blobs ── */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.1] pointer-events-none" />

      {/* ── Center card ── */}
      <div className="flex-1 flex items-center justify-center px-5 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Brand mark */}
          <div className="flex items-center gap-2.5 mb-8 select-none">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-extrabold text-base shadow-md group-hover:scale-105 transition-all duration-300">
                G
              </div>
              <span className="font-extrabold text-xl text-foreground">Grovii</span>
              <span className="text-[9px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">AI</span>
            </Link>
          </div>

          {/* Card */}
          <div className="glass-panel border border-border rounded-[28px] shadow-2xl p-8 space-y-7 bg-card">
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                      <KeyRound className="h-6 w-6 text-primary" /> Reset Password
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-sm text-destructive font-medium">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  {/* Form */}
                  <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Email address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className={`h-12 rounded-2xl bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground/30 transition-all ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive font-semibold pl-1">{errors.email.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-full bg-primary text-primary-foreground font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100 gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending Link...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 mb-2">
                    <MailCheck className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Check your email</h2>
                    <p className="text-sm font-medium text-muted-foreground max-w-xs mx-auto leading-relaxed">
                      We have sent password reset instructions to your email address if an account is registered.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back link */}
            <div className="text-center pt-2">
              <Link href="/sign-in" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
