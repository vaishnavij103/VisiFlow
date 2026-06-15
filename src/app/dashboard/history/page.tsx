"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, History, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getVisitors, Visitor } from "@/lib/vms-store";
import { Badge } from "@/components/ui/badge";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<Visitor[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setHistory(getVisitors());
  }, []);

  const filtered = history.filter(v => 
    `${v.firstName} ${v.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white shadow-sm">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-3xl font-bold">Visitor History</h1>
          </div>
          <div className="flex gap-2">
            <Input 
              placeholder="Search history..." 
              className="w-64 h-12 rounded-xl bg-white"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Button variant="outline" className="h-12 w-12 p-0 rounded-xl bg-white">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden border-none shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Visitor</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Check-In</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Check-Out</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Duration</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.map(v => {
                const checkOutStr = v.checkOutTime ? new Date(v.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-';
                const duration = v.checkOutTime 
                  ? `${Math.floor((new Date(v.checkOutTime).getTime() - new Date(v.checkInTime).getTime()) / 60000)}m`
                  : 'Active';

                return (
                  <tr key={v.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold">{v.firstName} {v.lastName}</p>
                      <p className="text-xs text-muted-foreground">{v.mobile}</p>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="rounded-full">{v.type}</Badge>
                    </td>
                    <td className="p-4 font-medium">
                      {new Date(v.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-4 font-medium">{checkOutStr}</td>
                    <td className="p-4 text-slate-500 font-medium">{duration}</td>
                    <td className="p-4">
                      <Badge 
                        variant={v.status === 'Checked-In' ? 'default' : 'secondary'}
                        className="rounded-full"
                      >
                        {v.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
