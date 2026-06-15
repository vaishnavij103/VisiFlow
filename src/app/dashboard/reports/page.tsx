"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, FileText, TrendingUp, Users, Calendar } from "lucide-react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";

const MOCK_CHART_DATA = [
  { name: 'Mon', visitors: 12 },
  { name: 'Tue', visitors: 18 },
  { name: 'Wed', visitors: 15 },
  { name: 'Thu', visitors: 22 },
  { name: 'Fri', visitors: 30 },
  { name: 'Sat', visitors: 5 },
  { name: 'Sun', visitors: 3 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ReportsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white shadow-sm">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-12 rounded-xl bg-white flex-1 md:flex-none">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
            <Button className="h-12 rounded-xl bg-green-600 hover:bg-green-700 flex-1 md:flex-none">
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
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <ChartTooltip 
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar 
                  dataKey="visitors" 
                  fill="var(--color-visitors)" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ChartContainer>
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
                    <span className="font-medium">Visitor {i}</span>
                  </div>
                  <Badge variant="outline">{10 - i} Visits</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 shadow-sm">
            <h4 className="font-bold mb-4">Visitor Purposes</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Business Meeting</span>
                  <span className="font-bold">45%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[45%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm mt-4">
                  <span>Interviews</span>
                  <span className="font-bold">25%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[25%]" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
