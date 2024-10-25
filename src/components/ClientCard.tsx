import { Building2, Mail, Phone, MapPin, Calendar, ChevronRight } from 'lucide-react';
import type { Client } from '../types/client';
import { formatDistanceToNow } from 'date-fns';

interface ClientCardProps {
  client: Client;
  onClick: (client: Client) => void;
}

export default function ClientCard({ client, onClick }: ClientCardProps) {
  return (
    <div
      onClick={() => onClick(client)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer border border-gray-100 p-6"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
        <p className="text-sm text-gray-500">{client.company}</p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{client.email}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="h-4 w-4" />
          <span>{client.phone}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{client.address}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Building2 className="h-4 w-4" />
          <span>{client.projectCount} Projects</span>
        </div>

        {client.lastProject && (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className="line-clamp-1">Last: {client.lastProject}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Last Contact: {formatDistanceToNow(new Date(client.lastContact), { addSuffix: true })}
        </span>
        <ChevronRight className="h-5 w-5 text-blue-500" />
      </div>
    </div>
  );
}