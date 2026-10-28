import Link from "next/link";
import { HiKey as KeyRound, HiArrowLeft as ArrowLeft } from "react-icons/hi2";

// This page used to pretend to send a reset email (a timer, then "check your
// inbox") while nothing was sent. Until email delivery exists it says so
// plainly (BACKLOG: password reset by email).
export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-5 py-12">
      <div className="w-full max-w-md bg-card border border-border rounded-[28px] shadow-xl p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <KeyRound className="h-6 w-6 text-primary" aria-hidden /> Reset password
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Password reset by email isn&apos;t available yet, so we can&apos;t send you a link.
          </p>
        </div>
        <ul className="text-sm text-foreground space-y-2 list-disc pl-5">
          <li>Locked out after several wrong attempts? Wait 15 minutes, then try again.</li>
          <li>Still signed in on another device? You can change your password in Settings there.</li>
          <li>Otherwise, contact the Grovii team from the email address on your account.</li>
        </ul>
        <Link href="/sign-in" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to sign in
        </Link>
      </div>
    </main>
  );
}
