import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { Client } from '../types/client';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (client: Omit<Client, 'id' | 'createdAt' | 'lastContact'>) => void;
  onDelete?: () => void;
  isLoading: boolean;
  initialData?: Client | null;
  showDelete?: boolean;
}

const defaultFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  address: '',
  projectCount: 0,
  notes: ''
};

export default function NewClientModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onDelete,
  isLoading, 
  initialData,
  showDelete 
}: NewClientModalProps) {
  const [formData, setFormData] = useState(defaultFormData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        company: initialData.company || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        projectCount: initialData.projectCount || 0,
        notes: initialData.notes || ''
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 overflow-y-auto z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mt-8">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Client' : 'New Client'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex justify-between">
            {showDelete && onDelete && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
                Delete Client
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Client'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Client</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{formData.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDelete?.();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}