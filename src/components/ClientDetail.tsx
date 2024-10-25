import { ArrowLeft, MapPin, Building2, Mail, Phone, Calendar, Clock, Pencil } from 'lucide-react';
import type { Client } from '../types/client';
import { useState } from 'react';
import NewClientModal from './NewClientModal';

interface ClientDetailProps {
  client: Client;
  onBack: () => void;
  onEdit: (client: Client) => void;
  onDelete: (clientId: string) => void;
}

export default function ClientDetail({ client, onBack, onEdit, onDelete }: ClientDetailProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (clientData: Omit<Client, 'id' | 'createdAt' | 'lastContact'>) => {
    setIsLoading(true);
    try {
      const updatedClient: Client = {
        ...clientData,
        id: client.id,
        createdAt: client.createdAt,
        lastContact: new Date().toISOString()
      };
      onEdit(updatedClient);
      setIsEditModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Clients
        </button>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Pencil className="h-4 w-4" />
          Edit Client
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-lg text-gray-600">{client.company}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{client.company}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{client.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{client.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{client.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Client Since</p>
                  <p className="font-medium">{new Date(client.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Last Contact</p>
                  <p className="font-medium">{new Date(client.lastContact).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {client.notes && (
            <div className="border-t mt-6 pt-6">
              <h2 className="text-lg font-semibold mb-3">Notes</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{client.notes}</p>
            </div>
          )}

          {client.lastProject && (
            <div className="border-t mt-6 pt-6">
              <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
              <p className="text-gray-600">Last Project: {client.lastProject}</p>
              <p className="text-gray-600">Total Projects: {client.projectCount}</p>
            </div>
          )}
        </div>
      </div>

      <NewClientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        onDelete={() => {
          onDelete(client.id);
          onBack();
        }}
        isLoading={isLoading}
        initialData={client}
        showDelete
      />
    </div>
  );
}