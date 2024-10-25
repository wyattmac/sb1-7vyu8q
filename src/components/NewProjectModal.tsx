import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { Project } from '../types/project';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: any) => void;
  onDelete?: () => void;
  isLoading: boolean;
  initialData?: Project | null;
  showDelete?: boolean;
}

const defaultFormData = {
  client: '',
  location: '',
  parcelNumber: '',
  contactPhone: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  status: 'pending' as const
};

export default function NewProjectModal({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  isLoading,
  initialData,
  showDelete
}: NewProjectModalProps) {
  const [formData, setFormData] = useState(defaultFormData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        client: initialData.client,
        location: initialData.location,
        parcelNumber: initialData.parcelNumber,
        contactPhone: initialData.contactPhone,
        description: initialData.description || '',
        date: initialData.date || new Date().toISOString().split('T')[0],
        status: initialData.status
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
            {initialData ? `Edit ${initialData.title}` : 'New Project'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Client</label>
              <input
                type="text"
                value={formData.client}
                onChange={e => setFormData(prev => ({ ...prev, client: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contact Phone</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={e => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Parcel Number</label>
              <input
                type="text"
                value={formData.parcelNumber}
                onChange={e => setFormData(prev => ({ ...prev, parcelNumber: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
                Delete Project
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
                {isLoading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Project</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
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
                  onDelete();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}