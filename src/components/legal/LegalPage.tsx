import Link from "next/link"
import { SUPPORT_EMAIL } from "@/lib/support"

/** Shared layout for policy pages. `draft` shows a banner until a lawyer reviews the text. */
export function LegalPage({ title, updated, draft = true, children }: {
  title: string
  updated: string
  draft?: boolean
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-background text-foreground px-5 py-12">
      <article className="max-w-2xl mx-auto space-y-6 text-sm leading-relaxed">
        <Link href="/" className="text-sm font-bold text-primary hover:underline">← Grovii</Link>
        {draft && (
          <p role="note" className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 font-semibold">
            Draft: this text has not been reviewed by a lawyer yet and must be reviewed before public launch.
          </p>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">Last updated: {updated}</p>
        <div className="space-y-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:pt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
          {children}
        </div>
        <p className="text-muted-foreground pt-4 border-t border-border">
          Questions: {SUPPORT_EMAIL ? <a className="text-primary underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> : "contact the Grovii team"}.
        </p>
      </article>
    </main>
  )
}
