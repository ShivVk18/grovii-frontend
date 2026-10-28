import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/LegalPage"

export const metadata: Metadata = { title: "Privacy policy · Grovii" }

// Plain description of what the code actually does (Phases B-G). Draft: needs legal review.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="2026-10-28">
      <h2>What we collect</h2>
      <ul>
        <li><strong>Account:</strong> your email address, username and a one-way hash of your password (we never store the password itself).</li>
        <li><strong>Your content:</strong> the video ideas and options you enter, and the shoot plans generated for you (scenes, script, captions, hashtags, music ideas, posting tips, repurposed posts).</li>
        <li><strong>Usage:</strong> your generations, their status and timing, credits, and how much AI processing each used (to enforce limits and costs).</li>
        <li><strong>Sign-ins:</strong> when each session started, expires or was ended.</li>
        <li><strong>Technical data:</strong> your IP address is used briefly to limit abuse (stored hashed, for up to an hour) and appears in server logs.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To create your shoot plans: your idea and options are sent to our AI provider (Google Gemini) to generate the plan.</li>
        <li>To run the service: sign-in, limits, preventing abuse, fixing errors.</li>
        <li>We don&apos;t sell your data and don&apos;t use it for advertising.</li>
      </ul>
      <h2>Who processes it for us</h2>
      <ul>
        <li>Google (Gemini API): generating content from your idea.</li>
        <li>Render: hosting our servers and database.</li>
        <li>Vercel: hosting the website.</li>
        <li>Sentry (if enabled): error reports, with your ideas, passwords, cookies and email removed before sending.</li>
      </ul>
      <h2>How long we keep it</h2>
      <ul>
        <li>Your account and content: until you delete them.</li>
        <li>Server logs: [retention period to be set by the operator].</li>
        <li>Database backups: up to [backup retention] days, then deleted.</li>
      </ul>
      <h2>Your choices</h2>
      <ul>
        <li><strong>Download your data:</strong> Settings → Your data → Download my data.</li>
        <li><strong>Delete your account:</strong> Settings → Delete account. This removes your account and all your content immediately (backups expire on their own schedule).</li>
        <li><strong>Sign out everywhere:</strong> Settings → Session.</li>
      </ul>
      <h2>Cookies</h2>
      <p>We use two cookies, both needed to keep you signed in safely: a session cookie and a security (CSRF) cookie. No advertising or tracking cookies.</p>
    </LegalPage>
  )
}
