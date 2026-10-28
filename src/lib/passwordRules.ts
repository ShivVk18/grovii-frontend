// Mirrors the API's rules (grovii-backend src/Schemas/auth_schema.py) so most
// problems are explained before sending. The API also blocks common passwords
// and has the final say; its message is shown under the field.
export const PASSWORD_MIN = 10
export const PASSWORD_MAX_BYTES = 72

export function passwordProblem(password: string, ctx: { email?: string; username?: string } = {}): string | null {
  if (password.length < PASSWORD_MIN) return `Password must be at least ${PASSWORD_MIN} characters.`
  if (new TextEncoder().encode(password).length > PASSWORD_MAX_BYTES)
    return `Password must be at most ${PASSWORD_MAX_BYTES} bytes (about ${PASSWORD_MAX_BYTES} letters).`
  if (new Set(password).size < 5) return "Password is too simple. Use a mix of different characters or a few random words."
  const lowered = password.toLowerCase()
  for (const part of [ctx.email?.split("@")[0], ctx.username]) {
    if (part && part.length >= 4 && lowered.includes(part.toLowerCase()))
      return "Password must not contain your email name or username."
  }
  return null
}

export const USERNAME_RE = /^[A-Za-z0-9_.-]{3,30}$/
export const USERNAME_MESSAGE = "Username must be 3-30 letters, numbers, dots, dashes or underscores."
