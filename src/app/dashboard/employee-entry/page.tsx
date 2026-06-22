"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CameraCapture } from "@/components/vms/CameraCapture";
import { SignaturePad } from "@/components/vms/SignaturePad";
import { ArrowLeft, Search, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addVisitor } from "@/lib/vms-store";

const MOCK_EMPLOYEES = [
  { code: 'E101', firstName: 'Mark', lastName: 'Wilson', mobile: '9000000001', gender: 'Male' },
  { code: 'E102', firstName: 'Sarah', lastName: 'Connor', mobile: '9000000002', gender: 'Female' },
  { code: 'E103', firstName: 'Leo', lastName: 'Das', mobile: '9000000003', gender: 'Male' },
];

export default function EmployeeEntryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isFound, setIsFound] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    gender: 'Male' as any,
    employeeCode: '',
    photoUrl: '',
    signatureUrl: '',
  });

  const handleSearch = () => {
    const emp = MOCK_EMPLOYEES.find(e => e.code.toLowerCase() === code.toLowerCase() || e.mobile === code);
    if (emp) {
      setFormData(prev => ({
        ...prev,
        ...emp,
        employeeCode: emp.code,
      }));
      setIsFound(true);
      toast({ title: "Employee Found", description: `Welcome back, ${emp.firstName}!` });
    } else {
      toast({ title: "Not Found", description: "Employee code invalid.", variant: "destructive" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVisitor({
      ...formData,
      type: 'Employee',
      personToVisit: 'Internal',
      purpose: 'Daily Login'
    });
    toast({ title: "Employee Check-in Recorded" });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white shadow-sm">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-bold">Employee Login</h1>
        </div>

        {!isFound ? (
          <Card className="p-10 text-center max-w-md mx-auto shadow-xl">
            <h3 className="text-xl font-bold mb-6">Enter Employee Code Or Mobile Number</h3>
            <div className="space-y-4">
              <Input
                placeholder="Ex: E101 or 9000000001"
                className="h-14 text-2xl text-center rounded-xl font-mono uppercase tracking-widest"
                value={code}
                onChange={e => setCode(e.target.value)}
              />
              <Button onClick={handleSearch} size="lg" className="w-full h-14 rounded-xl text-lg shadow-lg">
                <Search className="w-5 h-5 mr-2" /> Search Employee
              </Button>
            </div>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4">Confirm Identity</h3>
                <CameraCapture onCapture={uri => setFormData(f => ({ ...f, photoUrl: uri }))} />
              </Card>
              <Card className="p-6">
                <SignaturePad onSave={uri => setFormData(f => ({ ...f, signatureUrl: uri }))} />
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-slate-50 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Verified Employee</h3>
                    <p className="text-sm text-muted-foreground">Code: {formData.employeeCode}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="form-label">First Name</Label>
                      <p className="text-lg font-bold">{formData.firstName}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="form-label">Last Name</Label>
                      <p className="text-lg font-bold">{formData.lastName}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="form-label">Mobile</Label>
                    <p className="text-lg font-bold">{formData.mobile}</p>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button type="button" variant="outline" size="lg" className="flex-1 h-14 rounded-xl" onClick={() => setIsFound(false)}>
                  Back
                </Button>
                <Button type="submit" size="lg" className="flex-1 h-14 rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg text-lg">
                  Submit Login
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
