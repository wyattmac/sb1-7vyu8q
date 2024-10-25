export interface ScheduleEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  projectId?: string;
  clientId?: string;
  description?: string;
  location?: string;
  type: 'site-visit' | 'meeting' | 'survey' | 'office-work' | 'other';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  allDay?: boolean;
  color?: string;
}