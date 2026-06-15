"use client"

import React from 'react';
import Link from 'next/link';
import { UserPlus, Briefcase, Settings, Clock, Users, BarChart3 } from "lucide-react";
import { KioskButton } from "@/components/vms/KioskButton";
import { Card } from "@/components/ui/card";
import { getStats } from "@/lib/vms-store";

export default function Home() {
  const stats = getStats();

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary">VisiFlow</h1>
          <p className="text-muted-foreground font-medium">Digital Visitor Concierge</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-muted-foreground">{new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <Card className="p-6 bg-white flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-muted-foreground font-semibold text-xs uppercase tracking-widest mb-1">Visitors Today</span>
          <span className="text-4xl font-bold text-primary">{stats.today}</span>
        </Card>
        <Card className="p-6 bg-white flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-muted-foreground font-semibold text-xs uppercase tracking-widest mb-1">Weekly Total</span>
          <span className="text-4xl font-bold text-accent">{stats.week}</span>
        </Card>
        <Card className="p-6 bg-white flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-muted-foreground font-semibold text-xs uppercase tracking-widest mb-1">Monthly Total</span>
          <span className="text-4xl font-bold text-purple-600">{stats.month}</span>
        </Card>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1">
        <Link href="/dashboard/guest-entry" className="contents">
          <KioskButton 
            icon={UserPlus} 
            label="Guest Entry" 
            colorClass="text-destructive border-b-4 border-b-destructive"
          />
        </Link>
        <Link href="/dashboard/employee-entry" className="contents">
          <KioskButton 
            icon={Briefcase} 
            label="Employee Entry" 
            colorClass="text-purple-600 border-b-4 border-b-purple-600"
          />
        </Link>
        <Link href="/dashboard/checked-in" className="contents">
          <KioskButton 
            icon={Users} 
            label="Checked-In" 
            colorClass="text-primary border-b-4 border-b-primary"
          />
        </Link>
        <Link href="/dashboard/history" className="contents">
          <KioskButton 
            icon={Clock} 
            label="Visitor History" 
            colorClass="text-slate-600 border-b-4 border-b-slate-600"
          />
        </Link>
        <Link href="/dashboard/reports" className="contents">
          <KioskButton 
            icon={BarChart3} 
            label="Reports" 
            colorClass="text-green-600 border-b-4 border-green-600"
          />
        </Link>
        <Link href="/dashboard/users" className="contents">
          <KioskButton 
            icon={Settings} 
            label="Manage Users" 
            colorClass="text-accent border-b-4 border-accent"
          />
        </Link>
      </div>

      {/* Footer Branding */}
      <div className="mt-10 text-center text-slate-400 text-sm font-medium">
        Powered by VisiFlow Production VMS
      </div>
    </div>
  );
}
