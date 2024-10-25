import type { Project } from '../types/project';
import type { Client } from '../types/client';
import type { ScheduleEvent } from '../types/schedule';

export const initialProjects: Project[] = [
  {
    id: '100',
    title: 'Project #100',
    client: 'Metro Parks Department',
    location: '1234 Park Avenue, Central District',
    parcelNumber: 'APN-123456-789',
    contactPhone: '(555) 123-4567',
    date: '2024-03-15',
    status: 'in-progress',
    surveyType: 'Boundary',
    equipment: ['Total Station', 'GPS Rover'],
    fieldNotes: 'Found all corner monuments, need to verify easement',
    priority: 'high',
    lastUpdated: new Date().toISOString(),
    progress: 65,
    description: 'Complete boundary survey of Central City Park including playground area and parking facilities.'
  },
  {
    id: '101',
    title: 'Project #101',
    client: 'ABC Development Corp',
    location: '567 Business Loop, Downtown',
    parcelNumber: 'APN-789012-345',
    contactPhone: '(555) 987-6543',
    date: '2024-03-18',
    status: 'pending',
    surveyType: 'ALTA',
    equipment: ['GPS Base', 'GPS Rover', 'Drone'],
    fieldNotes: 'Awaiting utility markouts',
    priority: 'medium',
    lastUpdated: new Date().toISOString(),
    progress: 25,
    description: 'Property line survey for new commercial development'
  }
];

export const initialClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '555-0123',
    company: 'Smith Construction',
    address: '456 Business Ave',
    createdAt: '2024-01-15T08:00:00Z',
    lastContact: '2024-03-01T10:30:00Z',
    notes: '',
    projectCount: 2,
    lastProject: 'Project #100'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '555-0124',
    company: 'Johnson Development',
    address: '789 Developer Rd',
    createdAt: '2024-02-01T09:00:00Z',
    lastContact: '2024-03-02T14:15:00Z',
    notes: '',
    projectCount: 1,
    lastProject: 'Project #101'
  }
];