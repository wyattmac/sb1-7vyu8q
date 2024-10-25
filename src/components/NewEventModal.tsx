import { useState, useEffect } from 'react';
import { X, Trash2, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import type { ScheduleEvent } from '../types/schedule';
import type { DateSelectArg } from '@fullcalendar/core';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: ScheduleEvent | Omit<ScheduleEvent, 'id'>) => void;
  onDelete?: () => void;
  initialData?: ScheduleEvent | null;
  selectedDates?: DateSelectArg | null;
}

const defaultFormData = {
  title: '',
  type: 'site-visit' as const,
  status: 'scheduled' as const,
  description: '',
  location: '',
  start: new Date().toISOString(),
  end: new Date(Date.now() + 3600000).toISOString(),
  allDay: false
};

export default function NewEventModal({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  initialData,
  selectedDates
}: NewEventModalProps) {
  const [formData, setFormData] = useState(defaultFormData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else if (selectedDates) {
      setFormData(prev => ({
        ...prev,
        start: selectedDates.start.toISOString(),
        end: selectedDates.end.toISOString(),
        allDay: selectedDates.allDay || false
      }));
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData, selectedDates]);

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
            {initialData ? 'Edit Event' : 'New Event'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border rounded"
              placeholder="Enter event title"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as ScheduleEvent['type'] }))}
                className="w-full p-2 border rounded"
              >
                <option value="site-visit">Site Visit</option>
                <option value="meeting">Meeting</option>
                <option value="survey">Survey</option>
                <option value="office-work">Office Work</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as ScheduleEvent['status'] }))}
                className="w-full p-2 border rounded"
              >
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="datetime-local"
                required
                value={formData.start.slice(0, 16)}
                onChange={e => setFormData(prev => ({ ...prev, start: new Date(e.target.value).toISOString() }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="datetime-local"
                required
                value={formData.end.slice(0, 16)}
                onChange={e => setFormData(prev => ({ ...prev, end: new Date(e.target.value).toISOString() }))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-2 border rounded"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border rounded"
              placeholder="Enter event description"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="allDay"
              checked={formData.allDay}
              onChange={e => setFormData(prev => ({ ...prev, allDay: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <label htmlFor="allDay" className="text-sm font-medium">All Day Event</label>
          </div>

          <div className="flex justify-between">
            {onDelete && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
                Delete Event
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
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {initialData ? 'Save Changes' : 'Create Event'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Event</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this event? This action cannot be undone.
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
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}