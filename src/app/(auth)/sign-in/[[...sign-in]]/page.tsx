import { Suspense } from "react"
import SigninForm from "@/components/auth/SignInForm"

export default function SigninPage() {
  // The form reads ?expired and ?next from the URL.
  return (
    <Suspense>
      <SigninForm />
    </Suspense>
  )
}
