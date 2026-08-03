'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HiFire as Flame, HiEye as Eye, HiEyeSlash as EyeOff, HiExclamationCircle as AlertCircle, HiCheck as Check } from "react-icons/hi2";
import { signUpSchema, SignUpValues } from "@/schemas/authSchema";
import { authService } from "@/services/authService";

const perks = [
  "3 free storyboard generations daily",
  "AI scene & script generation",
  "Visual 9:16 canvas workspace",
];

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpValues) => {
    setError(null);
    try {
      await authService.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      router.push('/sign-in?registered=true');
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FAF7F2 0%, #FFF7F0 50%, #FAF7F2 100%)" }}
    >
      {/* ── Ambient blobs ── */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#F5DFC0]/60 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#8B5E3C]/8 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-200/12 blur-[80px] pointer-events-none" />

      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,94,60,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(139,94,60,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="flex-1 flex items-center justify-center px-5 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Brand mark */}
          <div className="flex items-center gap-2.5 mb-8 select-none">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.png"
                alt="Grovii Logo"
                className="w-9 h-9 rounded-xl object-cover shadow-md border border-[#8B5E3C]/20 group-hover:scale-105 transition-all duration-300"
              />
              <span className="font-extrabold text-xl text-[#5C4033]">Grovii</span>
              <span className="text-[9px] font-extrabold text-[#8B5E3C] bg-[#8B5E3C]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">AI</span>
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-[#8B5E3C]/12 rounded-[28px] shadow-2xl shadow-[#8B5E3C]/6 p-8 space-y-6">

            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-[#3D2B1F] tracking-tight">Create your account</h1>
              <p className="text-sm font-medium text-[#7A5C45]/70">
                Join thousands of creators using Grovii to grow faster.
              </p>
            </div>

            {/* Perks strip */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#FAF1E8]/80 border border-[#8B5E3C]/10">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2.5 text-xs font-semibold text-[#5C4033]/80">
                  <div className="w-4 h-4 rounded-full bg-[#8B5E3C]/12 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-[#8B5E3C] stroke-[3]" />
                  </div>
                  {perk}
                </div>
              ))}
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200/60 text-sm text-red-600 font-medium"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-xs font-bold text-[#5C4033] uppercase tracking-wider">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  className={`h-12 rounded-2xl bg-[#FAF7F2] border-[#8B5E3C]/15 focus:border-[#8B5E3C]/40 focus:ring-[#8B5E3C]/10 text-[#3D2B1F] placeholder:text-[#8B5E3C]/30 transition-all ${errors.username ? 'border-red-400' : ''}`}
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-xs text-red-500 font-semibold pl-1">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold text-[#5C4033] uppercase tracking-wider">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`h-12 rounded-2xl bg-[#FAF7F2] border-[#8B5E3C]/15 focus:border-[#8B5E3C]/40 focus:ring-[#8B5E3C]/10 text-[#3D2B1F] placeholder:text-[#8B5E3C]/30 transition-all ${errors.email ? 'border-red-400' : ''}`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 font-semibold pl-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-bold text-[#5C4033] uppercase tracking-wider">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`h-12 rounded-2xl bg-[#FAF7F2] border-[#8B5E3C]/15 focus:border-[#8B5E3C]/40 focus:ring-[#8B5E3C]/10 text-[#3D2B1F] placeholder:text-[#8B5E3C]/30 pr-12 transition-all ${errors.password ? 'border-red-400' : ''}`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C]/50 hover:text-[#8B5E3C] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 font-semibold pl-1">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-xs font-bold text-[#5C4033] uppercase tracking-wider">
                  Confirm password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className={`h-12 rounded-2xl bg-[#FAF7F2] border-[#8B5E3C]/15 focus:border-[#8B5E3C]/40 focus:ring-[#8B5E3C]/10 text-[#3D2B1F] placeholder:text-[#8B5E3C]/30 pr-12 transition-all ${errors.confirmPassword ? 'border-red-400' : ''}`}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C]/50 hover:text-[#8B5E3C] transition-colors"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 font-semibold pl-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-13 mt-2 rounded-full brand-gradient text-white font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-0 disabled:opacity-60 disabled:hover:scale-100 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <Flame className="h-4 w-4" />
                    Create Free Account
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[#8B5E3C]/10" />
              <span className="text-xs font-bold text-[#8B5E3C]/40">or</span>
              <div className="flex-1 h-px bg-[#8B5E3C]/10" />
            </div>

            {/* Google */}
            <button className="w-full h-12 rounded-full bg-white border border-[#8B5E3C]/15 text-[#5C4033] font-bold text-sm hover:bg-[#FAF7F2] hover:border-[#8B5E3C]/25 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Sign up with Google
            </button>

            {/* Sign in link */}
            <p className="text-center text-sm font-medium text-[#7A5C45]/70">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-bold text-[#8B5E3C] hover:text-[#5C4033] transition-colors underline-offset-2 hover:underline">
                Sign In
              </Link>
            </p>

            <p className="text-center text-xs text-[#8B5E3C]/40 font-medium">
              By creating an account you agree to our{" "}
              <a href="#" className="underline underline-offset-2 hover:text-[#8B5E3C] transition-colors">Terms</a>
              {" "}and{" "}
              <a href="#" className="underline underline-offset-2 hover:text-[#8B5E3C] transition-colors">Privacy Policy</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
