import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/LegalPage"

export const metadata: Metadata = { title: "Terms of use · Grovii" }

// Draft: needs legal review before public launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="2026-10-28">
      <h2>The service</h2>
      <p>Grovii turns your video idea into a shoot plan using AI. It&apos;s offered as-is while we improve it.</p>
      <h2>AI output</h2>
      <ul>
        <li>Generated plans can be wrong, incomplete or unsuitable. Review everything before you film or post.</li>
        <li>Music suggestions are style references, not licensed tracks. Check that you have the rights to any music you use, especially on business accounts.</li>
        <li>You are responsible for what you publish.</li>
      </ul>
      <h2>Your content</h2>
      <p>You keep the rights to your ideas and to the plans generated for you. You give us permission to process them only to provide the service.</p>
      <h2>Acceptable use</h2>
      <ul>
        <li>No illegal, harmful or hateful content, and no attempts to break, overload or misuse the service.</li>
        <li>We may limit or close accounts that break these rules.</li>
      </ul>
      <h2>Credits and plans</h2>
      <p>Credits let you generate plans; they have no cash value. Paid plans are not available. Failed generations are refunded automatically.</p>
      <h2>Ending your account</h2>
      <p>You can delete your account at any time in Settings.</p>
    </LegalPage>
  )
}
