"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CameraCapture } from "@/components/vms/CameraCapture";
import { SignaturePad } from "@/components/vms/SignaturePad";
import { extractIdentityInformation } from "@/ai/flows/identity-extraction-assistant";
import { Scan, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addVisitor } from "@/lib/vms-store";

export default function GuestEntryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loadingAI, setLoadingAI] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    gender: 'Male' as any,
    company: '',
    personToVisit: '',
    purpose: '',
    photoUrl: '',
    signatureUrl: '',
  });

  const handleAIAutoFill = async (imageDataUri: string) => {
    setLoadingAI(true);
    try {
      const result = await extractIdentityInformation({ 
        imageDataUri, 
        documentType: 'business_card' 
      });
      
      setFormData(prev => ({
        ...prev,
        firstName: result.firstName || prev.firstName,
        lastName: result.lastName || prev.lastName,
        mobile: result.mobileNumber || prev.mobile,
        email: result.email || prev.email,
        company: result.companyName || prev.company,
      }));
      
      toast({
        title: "AI Analysis Complete",
        description: "Form fields updated from document data.",
      });
    } catch (err) {
      toast({
        title: "AI Failed",
        variant: "destructive",
        description: "Could not extract data from the image.",
      });
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.mobile || !formData.personToVisit) {
      toast({ title: "Required Fields Missing", variant: "destructive" });
      return;
    }
    
    addVisitor({
      ...formData,
      type: 'Guest'
    });

    toast({
      title: "Check-in Successful",
      description: `Visitor ${formData.firstName} ${formData.lastName} is now checked in.`,
    });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white shadow-sm">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-bold">Guest Registration</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Media Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Profile Photo</h3>
                <div className="text-[10px] bg-accent/10 text-accent px-2 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI READY
                </div>
              </div>
              <CameraCapture onCapture={(uri) => {
                setFormData(f => ({ ...f, photoUrl: uri }));
                handleAIAutoFill(uri);
              }} />
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Scan a business card or ID for AI auto-fill.
              </p>
            </Card>

            <Card className="p-6">
              <SignaturePad onSave={(uri) => setFormData(f => ({ ...f, signatureUrl: uri }))} />
            </Card>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="form-label">First Name *</Label>
                  <Input 
                    id="firstName" 
                    className="touch-input" 
                    value={formData.firstName}
                    onChange={e => setFormData(f => ({ ...f, firstName: e.target.value }))}
                    disabled={loadingAI}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="form-label">Last Name *</Label>
                  <Input 
                    id="lastName" 
                    className="touch-input" 
                    value={formData.lastName}
                    onChange={e => setFormData(f => ({ ...f, lastName: e.target.value }))}
                    disabled={loadingAI}
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="mobile" className="form-label">Mobile Number *</Label>
                <Input 
                  id="mobile" 
                  type="tel" 
                  className="touch-input"
                  value={formData.mobile}
                  onChange={e => setFormData(f => ({ ...f, mobile: e.target.value }))}
                  disabled={loadingAI}
                />
              </div>

              <div className="space-y-2 mt-4">
                <Label className="form-label">Gender</Label>
                <RadioGroup 
                  defaultValue="Male" 
                  className="flex gap-6 mt-2"
                  value={formData.gender}
                  onValueChange={val => setFormData(f => ({ ...f, gender: val as any }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="male" className="w-6 h-6" />
                    <Label htmlFor="male" className="text-lg">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="female" className="w-6 h-6" />
                    <Label htmlFor="female" className="text-lg">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="company" className="form-label">Company Name</Label>
                <Input 
                  id="company" 
                  className="touch-input"
                  value={formData.company}
                  onChange={e => setFormData(f => ({ ...f, company: e.target.value }))}
                  disabled={loadingAI}
                />
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="visit" className="form-label">Person to Visit *</Label>
                <Input 
                  id="visit" 
                  className="touch-input"
                  value={formData.personToVisit}
                  onChange={e => setFormData(f => ({ ...f, personToVisit: e.target.value }))}
                />
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="purpose" className="form-label">Purpose of Visit *</Label>
                <Input 
                  id="purpose" 
                  className="touch-input"
                  value={formData.purpose}
                  onChange={e => setFormData(f => ({ ...f, purpose: e.target.value }))}
                />
              </div>
            </Card>

            <div className="flex gap-4">
              <Button type="button" variant="outline" size="lg" className="flex-1 h-14 rounded-xl text-lg" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" size="lg" className="flex-1 h-14 rounded-xl text-lg shadow-lg">
                Check-In Guest
              </Button>
            </div>
          </div>
        </form>

        {loadingAI && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <Card className="p-10 flex flex-col items-center gap-4 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <h3 className="text-xl font-bold">AI Assistant Extracting Details</h3>
              <p className="text-muted-foreground">Please wait while we process the image...</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
