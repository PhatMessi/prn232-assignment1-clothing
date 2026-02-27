"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4 py-12 md:py-20 bg-[#f6f7f8] min-h-screen">
      <div className="flex flex-col w-full max-w-[480px]">
        <div className="text-center mb-8">
          <h1 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight mb-3">Welcome Back</h1>
          <p className="text-slate-500 text-base font-normal leading-normal">
            Please enter your details to sign in.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex h-12 w-full items-center justify-center rounded-lg bg-slate-200 p-1">
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 bg-white shadow-sm text-[#137fec] text-sm font-medium leading-normal transition-all duration-200">
              <span className="truncate">Sign In</span>
              <input defaultChecked className="hidden" name="auth-toggle" type="radio" value="Sign In" />
            </label>
            <label 
              onClick={() => router.push('/register')}
              className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 text-slate-500 hover:text-slate-700 text-sm font-medium leading-normal transition-all duration-200"
            >
              <span className="truncate">Create Account</span>
              <input className="hidden" name="auth-toggle" type="radio" value="Create Account" />
            </label>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <label className="flex flex-col gap-2">
            <span className="text-slate-900 text-sm font-medium leading-normal">Email Address</span>
            <div className="relative">
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                className="flex w-full rounded-lg text-slate-900 border border-slate-300 bg-white h-12 px-4 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] focus:outline-none text-base font-normal leading-normal transition-colors pl-10"
                placeholder="Enter your email"
                type="email"
              />
              <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-900 text-sm font-medium leading-normal">Password</span>
              <Link href="#" className="text-[#137fec] hover:text-[#137fec]/80 text-xs font-medium transition-colors">Forgot Password?</Link>
            </div>
            <div className="relative">
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                className="flex w-full rounded-lg text-slate-900 border border-slate-300 bg-white h-12 px-4 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] focus:outline-none text-base font-normal leading-normal transition-colors pl-10 pr-10"
                placeholder="Enter your password"
                type="password"
              />
              <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <button type="button" className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors">
                <EyeOff className="w-5 h-5" />
              </button>
            </div>
          </label>

          <button
            disabled={isLoading}
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 bg-[#137fec] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 active:scale-[0.98] transition-all shadow-md hover:shadow-lg mt-2 disabled:opacity-50"
          >
            <span className="truncate">{isLoading ? "Signing In..." : "Sign In"}</span>
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase">Or continue with</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white h-10 hover:bg-slate-50 transition-colors">
              <span className="text-slate-900 text-sm font-medium">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white h-10 hover:bg-slate-50 transition-colors">
              <span className="text-slate-900 text-sm font-medium">Apple</span>
            </button>
          </div>
        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          By continuing, you agree to our <Link href="#" className="text-slate-900 hover:underline">Terms of Service</Link> and <Link href="#" className="text-slate-900 hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}