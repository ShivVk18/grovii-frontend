import SigninForm from "@/components/auth/SignInForm"
import AuthNavbar from "@/components/AuthNavbar"


export default function SigninPage() {
  return (
    <div className="min-h-screen w-full bg-muted/30">
      <AuthNavbar />

      <div className="flex justify-center items-center">
        <SigninForm/>
      </div>
    </div>
  )
}
