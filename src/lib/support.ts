// Where creators can reach a human. Set NEXT_PUBLIC_SUPPORT_EMAIL per environment.
export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || ""

export function supportLine(): string {
  return SUPPORT_EMAIL ? `Need help? Email ${SUPPORT_EMAIL}.` : "Need help? Contact the Grovii team."
}
