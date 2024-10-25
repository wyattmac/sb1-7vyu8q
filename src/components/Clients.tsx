import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import ClientCard from './ClientCard';
import ClientDetail from './ClientDetail';
import NewClientModal from './NewClientModal';
import ErrorAlert from './ErrorAlert';
import type { Client } from '../types/client';
import { initialClients } from '../data/initialData';

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClientClick = (client: Client) => {
    try {
      setSelectedClient(client);
      window.scrollTo(0, 0);
    } catch (err) {
      setError('Failed to load client details');
    }
  };

  const handleCreateClient = async (clientData: Omit<Client, 'id' | 'createdAt' | 'lastContact'>) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!clientData.name.trim()) {
        throw new Error('Client name is required');
      }
      const newClient: Client = {
        ...clientData,
        id: (clients.length + 1).toString(),
        createdAt: new Date().toISOString(),
        lastContact: new Date().toISOString()
      };
      setClients(prev => [newClient, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create client');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClient = (client: Client) => {
    try {
      setEditingClient(client);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to load client for editing');
    }
  };

  const handleUpdateClient = async (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!clientData.name.trim()) {
        throw new Error('Client name is required');
      }
      const updatedClient: Client = {
        ...clientData,
        id: editingClient!.id,
        createdAt: editingClient!.createdAt,
        lastContact: new Date().toISOString()
      };
      setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
      setIsModalOpen(false);
      setEditingClient(null);
      setSelectedClient(updatedClient);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update client');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = (clientId: string) => {
    try {
      setClients(prev => prev.filter(c => c.id !== clientId));
      setSelectedClient(null);
    } catch (err) {
      setError('Failed to delete client');
    }
  };

  const filteredClients = clients.filter(client => {
    try {
      return !searchTerm || Object.values(client).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (err) {
      console.error('Error filtering clients:', err);
      return false;
    }
  });

  if (selectedClient) {
    return (
      <ClientDetail
        client={selectedClient}
        onBack={() => setSelectedClient(null)}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          New Client
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map(client => (
          <ClientCard
            key={client.id}
            client={client}
            onClick={() => handleClientClick(client)}
          />
        ))}
      </div>

      {isModalOpen && (
        <NewClientModal
          client={editingClient}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingClient(null);
          }}
          onSubmit={editingClient ? handleUpdateClient : handleCreateClient}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}