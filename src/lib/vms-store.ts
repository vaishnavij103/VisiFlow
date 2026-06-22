
'use client';

export type VisitorStatus = 'Checked-In' | 'Checked-Out';

export interface Visitor {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email?: string;
  gender: 'Male' | 'Female' | 'Other';
  company?: string;
  personToVisit: string;
  purpose: string;
  checkInTime: Date;
  checkOutTime?: Date;
  status: VisitorStatus;
  photoUrl?: string;
  signatureUrl?: string;
  type: 'Guest' | 'Employee';
  employeeCode?: string;
  location: string;
}

// In-memory mock data (In a real app, this would be fetched from Firestore based on location)
let visitors: Visitor[] = [
  {
    id: 'V-1001',
    firstName: 'John',
    lastName: 'Doe',
    mobile: '9876543210',
    email: 'john@example.com',
    gender: 'Male',
    company: 'TechCorp',
    personToVisit: 'Jane Smith',
    purpose: 'Business Meeting',
    checkInTime: new Date(new Date().setHours(new Date().getHours() - 2)),
    status: 'Checked-In',
    type: 'Guest',
    location: 'Main Office'
  },
  {
    id: 'V-1002',
    firstName: 'Alice',
    lastName: 'Johnson',
    mobile: '9988776655',
    email: 'alice@company.com',
    gender: 'Female',
    company: 'Designers Inc',
    personToVisit: 'Mark Wilson',
    purpose: 'Interview',
    checkInTime: new Date(new Date().setHours(new Date().getHours() - 4)),
    status: 'Checked-In',
    type: 'Guest',
    location: 'Warehouse A'
  }
];

export const getVisitors = (location?: string) => {
  if (location && location !== 'All') {
    return visitors.filter(v => v.location === location);
  }
  return visitors;
};

export const addVisitor = (visitor: Omit<Visitor, 'id' | 'checkInTime' | 'status'>) => {
  const newVisitor: Visitor = {
    ...visitor,
    id: `V-${1000 + visitors.length + 1}`,
    checkInTime: new Date(),
    status: 'Checked-In',
  };
  visitors = [newVisitor, ...visitors];
  return newVisitor;
};

export const checkOutVisitor = (id: string) => {
  visitors = visitors.map(v => 
    v.id === id ? { ...v, status: 'Checked-Out' as const, checkOutTime: new Date() } : v
  );
};

export const getStats = (location?: string) => {
  const filtered = getVisitors(location);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const visitorsToday = filtered.filter(v => new Date(v.checkInTime) >= today).length;
  return {
    today: visitorsToday,
    week: visitorsToday + 12,
    month: visitorsToday + 48
  };
};

export const LOCATIONS = ['All',
  "Pune",
  "Mumbai",
  "Ahmedabad",
  "Coimbatore",
  "Hyderabad",
  "Bangalore(Domlur)",
  "Bangalore(Signet)",
  "Chennai",
];
