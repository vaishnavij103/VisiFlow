"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, FileJson, FileText, TrendingUp, Users, Calendar } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";

const MOCK_CHART_DATA = [
  { name: 'Mon', visitors: 12 },
  { name: 'Tue', visitors: 18 },
  { name: 'Wed', visitors: 15 },
  { name: 'Thu', visitors: 22 },
  { name: 'Fri', visitors: 30 },
  { name: 'Sat', visitors: 5 },
  { name: 'Sun', visitors: 3 },
];

export default function ReportsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white shadow-sm">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-12 rounded-xl bg-white">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
            <Button className="h-12 rounded-xl bg-green-600 hover:bg-green-700">
              <FileText className="w-4 h-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 flex items-center gap-4 bg-white shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-primary w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase">Weekly Growth</p>
              <h3 className="text-2xl font-bold">+15%</h3>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4 bg-white shadow-sm">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Users className="text-accent w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase">Avg. Daily Visitors</p>
              <h3 className="text-2xl font-bold">18</h3>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4 bg-white shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-purple-600 w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase">Peak Day</p>
              <h3 className="text-2xl font-bold">Friday</h3>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-white shadow-sm mb-8">
          <h3 className="text-xl font-bold mb-8">Weekly Visitor Traffic</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-primary text-white p-2 rounded-lg text-xs font-bold shadow-lg">
                          {payload[0].value} Visitors
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="visitors" 
                  fill="#2E5BFF" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-sm">
            <h4 className="font-bold mb-4">Top Frequent Visitors</h4>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">JD</div>
                    <span className="font-medium">John Doe</span>
                  </div>
                  <Badge variant="outline">8 Visits</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 shadow-sm">
            <h4 className="font-bold mb-4">Visitor Purposes</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Business Meeting</span>
                <span className="font-bold">45%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[45%]" />
              </div>
              <div className="flex items-center justify-between text-sm mt-4">
                <span>Interviews</span>
                <span className="font-bold">25%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[25%]" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
