'use client';

import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '@/graphql/operations';
import Link from 'next/link';

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  attendees: { id: string }[];
  tags: Tag[];
}

// Helper function to determine text color based on background color
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

export default function EventsPage() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <div className="p-8 text-center">Loading events...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading events: {error.message}</div>;

  const events: Event[] = data?.events || [];

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link 
          href="/events/new" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No events found. Create your first event!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <Link 
              key={event.id} 
              href={`/events/${event.id}`}
              className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
                  {event.attendees.length} {event.attendees.length === 1 ? 'attendee' : 'attendees'}
                </span>
              </div>
              <p className="text-gray-500 mt-2">
                {new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              
              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <div 
                      key={tag.id} 
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${tag.name.toLowerCase()}`}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
