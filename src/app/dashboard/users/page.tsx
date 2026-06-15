"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, UserPlus, Shield, UserCircle, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@visiflow.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'John Reception', email: 'reception@visiflow.com', role: 'Receptionist', status: 'Active' },
  { id: 3, name: 'Jane Clerk', email: 'clerk@visiflow.com', role: 'Receptionist', status: 'Inactive' },
];

export default function UsersPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white shadow-sm">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-3xl font-bold">User Management</h1>
          </div>
          <Button className="h-12 rounded-xl shadow-lg">
            <UserPlus className="w-4 h-4 mr-2" /> Add New User
          </Button>
        </div>

        <div className="grid gap-4">
          {MOCK_USERS.map(user => (
            <Card key={user.id} className="p-4 flex items-center justify-between shadow-sm bg-white">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${user.role === 'Admin' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                  {user.role === 'Admin' ? <Shield className="w-6 h-6" /> : <UserCircle className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Role</p>
                  <Badge variant={user.role === 'Admin' ? 'default' : 'outline'} className="rounded-full">
                    {user.role}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                  <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={user.status === 'Active' ? 'bg-green-500 hover:bg-green-600 rounded-full' : 'rounded-full'}>
                    {user.status}
                  </Badge>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl p-2 w-40">
                    <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                      <Pencil className="w-4 h-4" /> Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer text-destructive">
                      <Trash2 className="w-4 h-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
