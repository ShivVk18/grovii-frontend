'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  HiUser as UserIcon,
  HiCreditCard as CreditCard,
  HiExclamationTriangle as AlertTriangle,
  HiLockClosed as Lock,
  HiSun as Sun,
  HiMoon as Moon,
  HiTrash as Trash2,
  HiCheckCircle as CheckCircle,
  HiBell as Bell,
  HiSparkles as Sparkles,
  HiShieldCheck as ShieldCheck,
  HiCheck as Check,
  HiArrowPath as Loader2,
  HiArrowRightOnRectangle as LogoutIcon
} from "react-icons/hi2";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { apiErrorMessage, fieldErrors } from "@/lib/apiErrors";
import { passwordProblem, USERNAME_MESSAGE, USERNAME_RE } from "@/lib/passwordRules";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().superRefine((v, ctx) => {
    const problem = passwordProblem(v)
    if (problem) ctx.addIssue({ code: "custom", message: problem })
  }),
  confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const profileSchema = z.object({
  username: z.string().trim().regex(USERNAME_RE, USERNAME_MESSAGE),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function SettingsPage() {
  const { user, logout, refresh } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(false);

  useEffect(() => {
    // Read active theme state
    if (typeof window !== "undefined") {
      setIsThemeDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isThemeDark;
    setIsThemeDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    toast.success(`Switched to ${nextDark ? 'dark' : 'light'} theme`);
  };

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    setError: setProfileError,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    setError: setPasswordError,
    reset: resetPasswordForm
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema)
  });

  // These used to fake success with a timer; they now call the API (Phase F).
  const onProfileUpdate = async (data: ProfileFormValues) => {
    try {
      await authService.updateUsername(data.username.trim());
      await refresh();
      toast.success("Profile updated.");
    } catch (err) {
      setProfileError("username", { message: fieldErrors(err).username || apiErrorMessage(err, "Couldn't save your profile.") });
    }
  };

  const onPasswordUpdate = async (data: PasswordFormValues) => {
    try {
      await authService.changePassword(data.currentPassword, data.newPassword);
      toast.success("Password changed. Other devices were signed out.");
      resetPasswordForm();
    } catch (err) {
      const fields = fieldErrors(err);
      if (fields.new_password) setPasswordError("newPassword", { message: fields.new_password });
      else if ((err as { response?: { data?: { code?: string } } }).response?.data?.code === "wrong_password")
        setPasswordError("currentPassword", { message: apiErrorMessage(err) });
      else toast.error(apiErrorMessage(err, "Couldn't change your password."));
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await authService.exportMyData();
      toast.success("Your data was downloaded.");
    } catch (err) {
      toast.error(apiErrorMessage(err, "Couldn't download your data."));
    } finally {
      setIsExporting(false);
    }
  };

  const handleLogoutEverywhere = async () => {
    try {
      await authService.logoutEverywhere();
    } finally {
      window.location.href = "/sign-in";
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError("Enter your password to confirm.");
      return;
    }
    setDeleteError(null);
    setIsDeletingLoading(true);
    try {
      await authService.deleteAccount(deletePassword);
      toast.success("Your account and all your data were deleted.");
      window.location.href = "/sign-in";
    } catch (err) {
      setDeleteError(apiErrorMessage(err, "Couldn't delete your account. Nothing was deleted."));
    } finally {
      setIsDeletingLoading(false);
    }
  };

  const planName = user?.plan ? `${user.plan.toUpperCase()} Plan` : "FREE TRIAL PLAN";
  const credits = user?.credits ?? 0;

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-4xl font-sans mx-auto pb-16 px-4 sm:px-6"
    >
      
      <motion.div variants={itemVariant} className="text-left">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your creator credentials, subscription preferences, themes, and workspace options</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div variants={itemVariant} className="glass-panel rounded-3xl border border-border p-6 sm:p-8 bg-card relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-row items-center gap-4 pb-6 border-b border-border">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
            <UserIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Profile Information</h2>
            <p className="text-xs text-muted-foreground font-medium">Configure your workspace handle and profile avatar details</p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit(onProfileUpdate)} className="space-y-6 pt-6 relative z-10">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="settings-username" className="text-sm font-bold text-foreground">Username</Label>
              <Input 
                id="settings-username"
                {...registerProfile("username")}
                className={`rounded-xl border-border bg-background focus:ring-primary/20 text-sm h-11 ${profileErrors.username ? 'border-destructive' : ''}`}
              />
              {profileErrors.username && (
                <p className="text-xs text-destructive font-semibold">{profileErrors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="settings-email" className="text-sm font-bold text-foreground">Email address</Label>
              <Input 
                id="settings-email"
                defaultValue={user?.email || ""} 
                disabled 
                className="rounded-xl border-border bg-muted/50 text-muted-foreground text-sm h-11 cursor-not-allowed"
              />
            </div>
          </div>

          <Button type="submit" disabled={isProfileSubmitting} className="rounded-full font-bold text-sm px-8 py-5 h-11 shadow-sm transition">
            {isProfileSubmitting ? "Saving..." : "Save profile"}
          </Button>
        </form>
      </motion.div>

      {/* Password Update Section */}
      <motion.div variants={itemVariant} className="glass-panel rounded-3xl border border-border p-6 sm:p-8 bg-card relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-row items-center gap-4 pb-6 border-b border-border">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Change Password</h2>
            <p className="text-xs text-muted-foreground font-medium">Keep your canvas access secure</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit(onPasswordUpdate)} className="space-y-5 pt-6 relative z-10">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-sm font-bold text-foreground">Current password</Label>
              <Input 
                id="current-password"
                autoComplete="current-password"
                type="password"
                placeholder="••••••••"
                {...registerPassword("currentPassword")}
                className={`rounded-xl border-border bg-background focus:ring-primary/20 text-sm h-11 ${passwordErrors.currentPassword ? 'border-destructive' : ''}`}
              />
              {passwordErrors.currentPassword && (
                <p className="text-xs text-destructive font-semibold">{passwordErrors.currentPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm font-bold text-foreground">New password</Label>
              <Input 
                id="new-password"
                autoComplete="new-password"
                type="password"
                placeholder="••••••••"
                {...registerPassword("newPassword")}
                className={`rounded-xl border-border bg-background focus:ring-primary/20 text-sm h-11 ${passwordErrors.newPassword ? 'border-destructive' : ''}`}
              />
              {passwordErrors.newPassword && (
                <p className="text-xs text-destructive font-semibold">{passwordErrors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-new-password" className="text-sm font-bold text-foreground">Confirm new password</Label>
              <Input 
                id="confirm-new-password"
                autoComplete="new-password"
                type="password"
                placeholder="••••••••"
                {...registerPassword("confirmPassword")}
                className={`rounded-xl border-border bg-background focus:ring-primary/20 text-sm h-11 ${passwordErrors.confirmPassword ? 'border-destructive' : ''}`}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-xs text-destructive font-semibold">{passwordErrors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isPasswordSubmitting} className="rounded-full font-bold text-sm px-8 py-5 h-11 shadow-sm transition">
            {isPasswordSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </motion.div>

      {/* Subscription Plan Section */}
      <motion.div variants={itemVariant} className="glass-panel rounded-3xl border border-border p-6 sm:p-8 bg-card relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-row items-center gap-4 pb-6 border-b border-border">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Subscription Plan</h2>
            <p className="text-xs text-muted-foreground font-medium">Verify your workspace tiers and generation limits</p>
          </div>
        </div>

        <div className="space-y-8 pt-6 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 bg-secondary/50 p-6 rounded-2xl border border-border">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Current Tier</p>
              <div className="flex items-center gap-3 mt-2">
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight">{planName}</h3>
                <Badge className="bg-primary text-primary-foreground font-bold rounded-md px-2 py-0.5">
                  Active
                </Badge>
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={() => toast.info("Paid plans aren't available yet.")}
              className="rounded-full border-primary/20 text-foreground hover:bg-primary/10 font-bold text-xs px-6 py-5 h-11 shadow-sm transition"
            >
              Paid plans: not available yet
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-foreground">Remaining Generation Credits</span>
              <span className="font-bold text-primary">{credits} credits left</span>
            </div>

            <div className="w-full bg-secondary rounded-full h-3 overflow-hidden border border-border/50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (credits / 200) * 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-primary h-full rounded-full" 
              />
            </div>
            
            <p className="text-xs text-muted-foreground font-medium leading-relaxed mt-2">
              Each generation uses one credit. Failed generations are refunded automatically. Paid plans aren&apos;t available yet.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Theme Settings Section */}
      <motion.div variants={itemVariant} className="glass-panel rounded-3xl border border-border p-6 sm:p-8 bg-card relative overflow-hidden text-left">
        <div className="flex flex-row items-center gap-4 pb-6 border-b border-border">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
            <Sun className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">App Preferences</h2>
            <p className="text-xs text-muted-foreground font-medium">Manage theme styles and user dashboard displays</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 pt-6">
          <div className="text-left">
            <h4 className="text-sm font-bold text-foreground">Visual Theme Mode</h4>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">Select dark mode or default light warm modes</p>
          </div>

          <Button 
            variant="outline" 
            onClick={toggleTheme}
            className="rounded-full border-border bg-secondary hover:bg-secondary/80 font-bold text-xs px-6 py-5 h-11 shadow-sm transition gap-2"
          >
            {isThemeDark ? (
              <>
                <Sun className="h-4 w-4" />
                Light Theme
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Dark Theme
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Session Management Section */}
      <motion.div variants={itemVariant} className="glass-panel rounded-3xl border border-border p-6 sm:p-8 bg-card relative overflow-hidden text-left">
        <div className="flex flex-row items-center gap-4 pb-6 border-b border-border">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0">
            <LogoutIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Session & Authentication</h2>
            <p className="text-xs text-muted-foreground font-medium">Manage your active creator login session on this device</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 pt-6">
          <div className="text-left">
            <h4 className="text-sm font-bold text-foreground">Sign Out of Workspace</h4>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">End your active studio session and return to the sign-in screen</p>
          </div>

          <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            onClick={handleLogoutEverywhere}
            className="rounded-full border-border font-bold text-xs px-6 py-5 h-11 shadow-sm transition"
          >
            Sign out everywhere
          </Button>
          <Button 
            variant="outline" 
            onClick={async () => {
              await logout();
              toast.success("Logged out successfully");
              window.location.href = "/sign-in";
            }}
            className="rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 font-bold text-xs px-6 py-5 h-11 shadow-sm transition gap-2"
          >
            <LogoutIcon className="h-4 w-4" />
            Log Out
          </Button>
          </div>
        </div>
      </motion.div>

      {/* Your data (export) */}
      <motion.div variants={itemVariant} className="glass-panel rounded-3xl border border-border p-6 sm:p-8 bg-card relative overflow-hidden text-left">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Your data</h2>
            <p className="text-xs text-muted-foreground font-medium mt-1 max-w-md">
              Download everything Grovii stores about you: your account, every storyboard with its scenes, captions,
              music and posts, and your generation history.
            </p>
          </div>
          <Button variant="outline" onClick={handleExport} disabled={isExporting}
            className="rounded-full border-border font-bold text-xs px-6 py-5 h-11 shadow-sm transition">
            {isExporting ? "Preparing…" : "Download my data"}
          </Button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div variants={itemVariant} className="glass-panel rounded-3xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8 relative overflow-hidden text-left">
        <div className="flex flex-row items-center gap-4 pb-6 border-b border-destructive/10">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-destructive">Danger Zone</h2>
            <p className="text-xs text-destructive/70 font-medium">Critical irreversible account actions</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 pt-6">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Permanently delete your account and everything in it. This can&apos;t be undone.
          </p>

          <Button 
            variant="destructive" 
            onClick={() => setIsDeleting(true)}
            className="rounded-full font-bold text-xs px-6 py-5 h-11 shrink-0 transition-transform hover:scale-[1.02]"
          >
            Delete Account
          </Button>
        </div>
      </motion.div>

      {/* Delete Account dialog: needs the password (the API re-checks it) */}
      <AnimatePresence>
        {isDeleting && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-title"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onKeyDown={(e) => { if (e.key === "Escape" && !isDeletingLoading) { setIsDeleting(false); setDeletePassword(""); setDeleteError(null); } }}
              className="bg-card border border-border shadow-2xl rounded-3xl max-w-md w-full p-8 space-y-6 text-left relative overflow-hidden"
            >
              <div className="flex items-center gap-3 text-destructive">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                  <Trash2 className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 id="delete-title" className="text-lg font-bold">Delete your account</h3>
                  <p className="text-xs text-destructive font-medium">This can&apos;t be undone</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Your account, every storyboard, scene, caption, music idea and post, and your generation history will be
                permanently deleted. Want a copy first? Use <strong className="text-foreground">Download my data</strong>.
              </p>

              <form
                className="space-y-4"
                onSubmit={(e) => { e.preventDefault(); void handleDeleteAccount(); }}
              >
                <div className="space-y-2">
                  <Label htmlFor="delete-password" className="text-sm font-bold text-foreground">Your password</Label>
                  <Input
                    id="delete-password"
                    type="password"
                    autoComplete="current-password"
                    autoFocus
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    aria-invalid={!!deleteError}
                    aria-describedby={deleteError ? "delete-error" : undefined}
                    className="rounded-xl border-border bg-background focus:ring-destructive/20 text-sm h-11"
                  />
                  {deleteError && (
                    <p id="delete-error" role="alert" className="text-xs text-destructive font-semibold">{deleteError}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isDeletingLoading}
                    onClick={() => { setIsDeleting(false); setDeletePassword(""); setDeleteError(null); }}
                    className="flex-1 rounded-full font-bold text-xs py-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={!deletePassword || isDeletingLoading}
                    className="flex-1 rounded-full font-bold text-xs py-5"
                  >
                    {isDeletingLoading ? (
                      <span className="flex items-center gap-1.5 justify-center">
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> Deleting…
                      </span>
                    ) : "Delete my account"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
