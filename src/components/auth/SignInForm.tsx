import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInForm() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4
      bg-gradient-to-b from-white to-orange-50 dark:from-background dark:to-muted/30">

      <Card className="w-full max-w-sm shadow-xl border border-[#8B5E3C]/30 backdrop-blur-md rounded-2xl">
        
        <CardHeader className="space-y-3">
          
          {/* Gradient Title */}
          <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-[#8B5E3C] to-[#A47551] bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>

          <CardDescription className="text-muted-foreground text-sm">
            Sign in to continue creating scroll-stopping reels.
          </CardDescription>

          <div className="text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>{" "}
            <button className="text-[#8B5E3C] font-medium underline-offset-4 hover:underline">
              Sign Up
            </button>
          </div>

        </CardHeader>

        <CardContent>
          <form className="space-y-6">

            {/* Email */}
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="text-[#5C4033]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="focus:ring-2 focus:ring-[#A47551]/60 focus:border-[#8B5E3C]"
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#5C4033]">Password</Label>
                <a
                  href="#"
                  className="text-xs text-[#8B5E3C] underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                className="focus:ring-2 focus:ring-[#A47551]/60 focus:border-[#8B5E3C]"
                required
              />
            </div>

          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">

          {/* Primary Login Button */}
          <Button
            className="w-full text-sm font-semibold rounded-xl shadow-md
              bg-gradient-to-r from-[#8B5E3C] to-[#A47551] text-white
              hover:brightness-110 transition"
          >
            Sign In
          </Button>

          {/* Continue with Google */}
          <Button
            variant="outline"
            className="w-full text-sm font-medium rounded-xl border border-[#8B5E3C]
              text-[#8B5E3C] hover:bg-orange-50 dark:hover:bg-muted/40"
          >
            Continue with Google
          </Button>

        </CardFooter>

      </Card>
    </div>
  )
}
