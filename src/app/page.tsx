
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UserPlus,
  Briefcase,
  Settings,
  Clock,
  Users,
  BarChart3,
  MapPin,
  Moon,
  Sun,
  LogOut
} from "lucide-react";
import { KioskButton } from "@/components/vms/KioskButton";
import { Card } from "@/components/ui/card";
import { getStats, LOCATIONS } from "@/lib/vms-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Apexon_id6ht3QYLO_0.png";

export default function Home() {
  const [location, setLocation] = useState("All");
  const stats = getStats(location);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-2">
          <img
            src={logo.src}
            alt="VisiFlow Logo"
            className="h-10 w-auto"
          />

          <div className="flex flex-col justify-center leading-tight">
            <h1 className="text-2xl font-semibold text-primary">
              VisiFlow
            </h1>
            <p className="text-xs text-muted-foreground">
              Visitor Management System
            </p>
          </div>
        </div>


        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Link href="/login">
              <Button variant="ghost" size="icon" className="rounded-full text-destructive">
                <LogOut className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p className="text-muted-foreground text-sm">{new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Location Filter & Toolbar */}
      <div className="mb-10 flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-primary">
          <MapPin className="w-5 h-5" />
          <span className="font-bold uppercase text-xs tracking-widest">Active Location:</span>
        </div>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-64 h-11 rounded-lg border-primary/20">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {LOCATIONS.map(loc => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="p-6 bg-card flex flex-col items-center justify-center text-center shadow-sm border-none">
          <span className="text-muted-foreground font-semibold text-xs uppercase tracking-widest mb-1">Visitors Today</span>
          <span className="text-4xl font-bold text-primary">{stats.today}</span>
        </Card>
        <Card className="p-6 bg-card flex flex-col items-center justify-center text-center shadow-sm border-none">
          <span className="text-muted-foreground font-semibold text-xs uppercase tracking-widest mb-1">Weekly Total</span>
          <span className="text-4xl font-bold text-accent">{stats.week}</span>
        </Card>
        <Card className="p-6 bg-card flex flex-col items-center justify-center text-center shadow-sm border-none">
          <span className="text-muted-foreground font-semibold text-xs uppercase tracking-widest mb-1">Monthly Total</span>
          <span className="text-4xl font-bold text-purple-600">{stats.month}</span>
        </Card>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1">
        <Link href={`/dashboard/guest-entry?location=${encodeURIComponent(location === 'All' ? 'Main Office' : location)}`} className="contents">
          <KioskButton
            icon={UserPlus}
            label="Guest Entry"
            colorClass="text-destructive border-b-4 border-b-destructive"
          />
        </Link>
        <Link href={`/dashboard/employee-entry?location=${encodeURIComponent(location === 'All' ? 'Main Office' : location)}`} className="contents">
          <KioskButton
            icon={Briefcase}
            label="Employee Entry"
            colorClass="text-purple-600 border-b-4 border-b-purple-600"
          />
        </Link>
        <Link href={`/dashboard/checked-in?location=${encodeURIComponent(location)}`} className="contents">
          <KioskButton
            icon={Users}
            label="Checked-In"
            colorClass="text-primary border-b-4 border-b-primary"
          />
        </Link>
        <Link href={`/dashboard/history?location=${encodeURIComponent(location)}`} className="contents">
          <KioskButton
            icon={Clock}
            label="Visitor History"
            colorClass="text-slate-600 border-b-4 border-b-slate-600"
          />
        </Link>
        <Link href={`/dashboard/reports?location=${encodeURIComponent(location)}`} className="contents">
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
        Powered by VisiFlow Production VMS • {location === 'All' ? 'Global View' : location}
      </div>
    </div>
  );
}
