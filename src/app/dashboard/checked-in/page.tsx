
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  ClipboardList, 
  ChevronRight, 
  User, 
  UserSquare2 
} from "lucide-react";
import { getVisitors, Visitor } from "@/lib/vms-store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function CheckedInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [showGuests, setShowGuests] = useState(true);
  const [showEmployees, setShowEmployees] = useState(true);
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    // Initial fetch
    setVisitors(getVisitors().filter(v => v.status === 'Checked-In'));
  }, []);

  const filteredVisitors = useMemo(() => {
    return visitors.filter(v => {
      const matchesSearch = `${v.firstName} ${v.lastName}`.toLowerCase().includes(search.toLowerCase()) || 
                            v.mobile.includes(search);
      const matchesType = (v.type === 'Guest' && showGuests) || (v.type === 'Employee' && showEmployees);
      return matchesSearch && matchesType;
    });
  }, [visitors, search, showGuests, showEmployees]);

  // Group visitors by date
  const groupedVisitors = useMemo(() => {
    const groups: { [key: string]: Visitor[] } = {};
    filteredVisitors.forEach(v => {
      const date = new Date(v.checkInTime).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(v);
    });
    return groups;
  }, [filteredVisitors]);

  const sortedDates = Object.keys(groupedVisitors).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Reddish-Orange Header */}
      <div className="bg-[#E65100] text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()} 
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-8 h-8" />
              <h1 className="text-xl font-semibold">Visitor Checked In</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full">
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center space-x-2">
              <label htmlFor="guest" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Guest</label>
              <Checkbox 
                id="guest" 
                checked={showGuests} 
                onCheckedChange={(checked) => setShowGuests(!!checked)}
                className="w-6 h-6 border-2 border-orange-500 data-[state=checked]:bg-orange-500 rounded"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="employee" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Employee</label>
              <Checkbox 
                id="employee" 
                checked={showEmployees} 
                onCheckedChange={(checked) => setShowEmployees(!!checked)}
                className="w-6 h-6 border-2 border-orange-500 data-[state=checked]:bg-orange-500 rounded"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-400">
            <div className="h-10 w-[1px] bg-slate-200 mx-4 hidden md:block"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Today Date</span>
            <span className="text-sm font-semibold text-slate-600">
              {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {sortedDates.length > 0 ? (
            sortedDates.map(date => (
              <div key={date}>
                {/* Date Group Header */}
                <div className="bg-slate-200/60 px-6 py-2 flex items-center gap-2 border-y border-slate-200">
                  <div className="w-4 h-4 text-slate-400">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                  <span className="text-sm font-medium text-slate-500">{date}</span>
                </div>

                {/* Visitor Cards */}
                <div className="divide-y divide-slate-100 bg-white">
                  {groupedVisitors[date].map(visitor => (
                    <div 
                      key={visitor.id} 
                      className="flex items-center p-4 md:p-6 hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      {/* Avatar */}
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-slate-100 overflow-hidden relative flex-shrink-0 mr-4 md:mr-6">
                        {visitor.photoUrl ? (
                          <img src={visitor.photoUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                            <User className="w-8 h-8 text-slate-300" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <h3 className="font-bold text-slate-700 text-sm md:text-base leading-tight">
                            {visitor.firstName} {visitor.lastName}
                          </h3>
                          <p className="text-xs md:text-sm text-slate-400 font-medium">
                            (M) {visitor.mobile}
                          </p>
                        </div>
                        <div className="space-y-1 text-right md:text-left">
                          <p className="text-xs md:text-sm font-semibold text-slate-500">
                            In - {formatDate(visitor.checkInTime)}
                          </p>
                          <p className="text-[10px] md:text-xs text-slate-400">
                            10:05 AM {/* Hardcoded as per reference image design */}
                          </p>
                        </div>
                      </div>

                      {/* Type Icon */}
                      <div className="mx-4 md:mx-8">
                        {visitor.type === 'Employee' ? (
                          <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-red-500 rounded-lg flex items-center justify-center text-red-500">
                            <UserSquare2 className="w-6 h-6 md:w-8 md:h-8" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-purple-500 rounded-lg flex items-center justify-center text-purple-500">
                            <User className="w-6 h-6 md:w-8 md:h-8" />
                          </div>
                        )}
                      </div>

                      {/* Chevron */}
                      <ChevronRight className="w-6 h-6 text-orange-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center space-y-4">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <ClipboardList className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-400">No visitors found</h3>
              <p className="text-slate-400">Adjust your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
