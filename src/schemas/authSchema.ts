import { z } from 'zod';
import { passwordProblem, USERNAME_MESSAGE, USERNAME_RE } from '@/lib/passwordRules';

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type SignInValues = z.infer<typeof signInSchema>;

// Same rules as the API (Phase F); the API also blocks common passwords.
export const signUpSchema = z.object({
  username: z.string().trim().regex(USERNAME_RE, USERNAME_MESSAGE),
  email: z.string().email('Please enter a valid email address'),
  password: z.string(),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).superRefine((data, ctx) => {
  const problem = passwordProblem(data.password, { email: data.email, username: data.username });
  if (problem) ctx.addIssue({ code: 'custom', path: ['password'], message: problem });
  if (data.password !== data.confirmPassword)
    ctx.addIssue({ code: 'custom', path: ['confirmPassword'], message: "Passwords don't match" });
});

export type SignUpValues = z.infer<typeof signUpSchema>;
