"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, UserCheck, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getVisitors, checkOutVisitor, Visitor } from "@/lib/vms-store";
import { useToast } from "@/hooks/use-toast";

export default function CheckedInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    setVisitors(getVisitors().filter(v => v.status === 'Checked-In'));
  }, []);

  const handleCheckout = (id: string, name: string) => {
    checkOutVisitor(id);
    setVisitors(prev => prev.filter(v => v.id !== id));
    toast({
      title: "Visitor Checked Out",
      description: `${name} has been successfully checked out.`,
    });
  };

  const filtered = visitors.filter(v => 
    `${v.firstName} ${v.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    v.mobile.includes(search)
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white shadow-sm">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-3xl font-bold">Checked-In Visitors</h1>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search by name or mobile..." 
              className="pl-10 h-12 rounded-xl bg-white"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-4">
            {filtered.map(visitor => (
              <Card key={visitor.id} className="p-4 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center border-2 border-white overflow-hidden relative">
                  {visitor.photoUrl ? (
                    <img src={visitor.photoUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <UserCheck className="w-8 h-8 text-primary/30" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{visitor.firstName} {visitor.lastName}</h3>
                    <Badge variant={visitor.type === 'Guest' ? 'destructive' : 'secondary'} className="rounded-full text-[10px] uppercase">
                      {visitor.type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">{visitor.mobile} • {visitor.company || 'Private'}</p>
                </div>

                <div className="hidden md:block px-6 border-l border-slate-100">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Visiting</p>
                  <p className="font-semibold">{visitor.personToVisit}</p>
                </div>

                <div className="hidden md:block px-6 border-l border-slate-100">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Checked In</p>
                  <p className="font-semibold">{new Date(visitor.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleCheckout(visitor.id, `${visitor.firstName} ${visitor.lastName}`)}
                    className="rounded-xl h-12 px-6 shadow-md bg-destructive hover:bg-destructive/90"
                  >
                    Check-Out
                  </Button>
                  <Button variant="outline" className="h-12 w-12 p-0 rounded-xl">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-400">No visitors found</h3>
            <p className="text-slate-400">All visitors are currently checked out.</p>
          </div>
        )}
      </div>
    </div>
  );
}
