import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { ScheduleEvent } from '../types/schedule';

export function Schedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleNewEvent = (e: CustomEvent<ScheduleEvent>) => {
      setEvents(prev => [...prev, e.detail]);
    };

    window.addEventListener('newScheduleEvent', handleNewEvent as EventListener);
    
    return () => {
      window.removeEventListener('newScheduleEvent', handleNewEvent as EventListener);
    };
  }, []);

  const getDayEvents = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          
          <div className="space-y-4">
            {getDayEvents(selectedDate).map(event => (
              <div
                key={event.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mt-2">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>
                        {formatTime(event.start)} - {formatTime(event.end)}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    event.status === 'completed' ? 'bg-green-100 text-green-800' :
                    event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                {event.description && (
                  <p className="text-gray-600 mt-2">{event.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;