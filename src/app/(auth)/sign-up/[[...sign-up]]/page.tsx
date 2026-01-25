import SignUpForm from "@/components/auth/SignUpForm"
import AuthNavbar from "@/components/AuthNavbar"


export default function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-muted/30">
      <AuthNavbar />

      <div className="pt-10 flex justify-center items-center">
        <SignUpForm />
      </div>
    </div>
  )
}