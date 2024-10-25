import { Project } from '../types/project';

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
    fieldNotes: 'Found all corner monuments, need to verify easement',
    priority: 'high',
    lastUpdated: '2024-03-15T10:30:00Z',
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
    fieldNotes: 'Awaiting utility markouts',
    priority: 'medium',
    lastUpdated: '2024-03-14T15:45:00Z',
    progress: 25,
    description: 'Property line survey for new commercial development'
  }
];