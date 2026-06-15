
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { UserPlus, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration for demo
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Account Created", description: "You can now sign in with your credentials." });
      router.push('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-xl border-none">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">VisiFlow</h1>
          <p className="text-muted-foreground">Join our Visitor Management Network</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>

          <Button type="submit" className="w-full h-12 text-lg shadow-lg mt-4" disabled={loading}>
            {loading ? "Processing..." : <><UserPlus className="w-5 h-5 mr-2" /> Create Account</>}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          <Link href="/login" className="text-sm font-medium text-primary hover:underline flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}
