
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate auth for demo
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Login Successful", description: "Welcome back to VisiFlow." });
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-xl border-none">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">VisiFlow</h1>
          <p className="text-muted-foreground">Admin & Staff Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@visiflow.com" 
              className="h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              className="h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 text-lg shadow-lg" disabled={loading}>
            {loading ? "Signing in..." : <><LogIn className="w-5 h-5 mr-2" /> Sign In</>}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t text-center space-y-4">
          <p className="text-sm text-muted-foreground">Don't have an account?</p>
          <Link href="/register">
            <Button variant="outline" className="w-full h-12">
              <UserPlus className="w-5 h-5 mr-2" /> Register New Account
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
