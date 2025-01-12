// components/core/authform.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FiMail, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUser, verifyUser } from "@/app/actions/auth";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isLogin && password !== confirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }

      if (isLogin) {
        await verifyUser(email, password);
      } else {
        await createUser(email, password);
      }
      
      toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[380px] bg-zinc-950/95 border-zinc-800/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-white font-bold text-center">
          {isLogin ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-zinc-400 text-center">
          {isLogin
            ? "Enter your credentials to sign in"
            : "Enter your details to create your account"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-zinc-400" />
            </div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-zinc-900/90 border-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-zinc-700"
              required
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-zinc-400" />
            </div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-zinc-900/90 border-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-zinc-700"
              required
            />
          </div>
          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-zinc-400" />
              </div>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 bg-zinc-900/90 border-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-zinc-700"
                required
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            disabled={loading}
          >
            {loading ? "Loading..." : (isLogin ? "Sign in" : "Sign up")}
          </Button>
          <p className="text-sm text-zinc-400 text-center">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setPassword("");
                setConfirmPassword("");
              }}
              className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}