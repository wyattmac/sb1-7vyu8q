export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  lastContact: string;
  projectCount?: number;
  lastProject?: string;
  avatar?: string;
}