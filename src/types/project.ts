export type ProjectStatus = 'pending' | 'in-progress' | 'completed';
export type ProjectPriority = 'low' | 'medium' | 'high';

export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  parcelNumber: string;
  contactPhone: string;
  date: string;
  status: ProjectStatus;
  surveyType: string;
  fieldNotes?: string;
  priority: ProjectPriority;
  lastUpdated: string;
  progress: number;
  description: string;
}