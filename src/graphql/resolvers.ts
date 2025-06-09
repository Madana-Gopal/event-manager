import { v4 as uuidv4 } from 'uuid';

// In-memory storage
interface Attendee {
  id: string;
  name: string;
  email?: string;
  eventId: string;
}

interface Tag {
  id: string;
  name: string;
  // color?: string;
}

interface EventTag {
  eventId: string;
  tagId: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  attendees: Attendee[];
  tags?: Tag[];
}

// Sample data
let tags: Tag[] = [
  { id: '1', name: 'Internal',
    //  color: '#FF5733' 
    },
  { id: '2', name: 'Public', 
    // color: '#33FF57'
   },
  { id: '3', name: 'Team Offsite',
    //  color: '#3357FF' 
    },
];

let eventTags: EventTag[] = [
  { eventId: '1', tagId: '3' }, // Team Building Workshop has Team Offsite tag
  { eventId: '2', tagId: '2' }, // Product Launch has Public tag
];

let events: Event[] = [
  {
    id: '1',
    title: 'Team Building Workshop',
    date: '2025-07-15',
    attendees: [
      { id: '101', name: 'John Doe', email: 'john@example.com', eventId: '1' },
      { id: '102', name: 'Jane Smith', email: 'jane@example.com', eventId: '1' },
    ],
  },
  {
    id: '2',
    title: 'Product Launch',
    date: '2025-08-20',
    attendees: [
      { id: '103', name: 'Bob Johnson', email: 'bob@example.com', eventId: '2' },
    ],
  },
];

export const resolvers = {
  Query: {
    events: () => {
      // Add tags to each event
      return events.map(event => ({
        ...event,
        tags: getTagsForEvent(event.id)
      }));
    },
    event: (_: unknown, { id }: { id: string }) => {
      const event = events.find((event) => event.id === id);
      if (!event) return null;
      
      return {
        ...event,
        tags: getTagsForEvent(id)
      };
    },
    tags: () => tags,
  },
  Mutation: {
    createEvent: (_: unknown, { title, date,selectedTags }: { title: string; date: string, selectedTags?:string[]}) => {
    console.log(" tags at create ",tags)
      const eventId= uuidv4();
      const newEvent: Event = {
        id: eventId,
        title,
        date,
        attendees: [],
      };
      events.push(newEvent);
      selectedTags?.forEach((t:string)=>{
        eventTags.push({eventId,tagId:t})
      })
      return {
        ...newEvent,
        tags: getTagsForEvent(eventId)
      };
    },
    addAttendee: (
      _: unknown,
      { eventId, name, email }: { eventId: string; name: string; email?: string }
    ) => {
      const event = events.find((e) => e.id === eventId);
      if (!event) {
        throw new Error(`Event with ID ${eventId} not found`);
      }

      const newAttendee: Attendee = {
        id: uuidv4(),
        name,
        email,
        eventId,
      };

      event.attendees.push(newAttendee);
      return newAttendee;
    },
    removeAttendee: (_: unknown, { id }: { id: string }) => {
      for (const event of events) {
        const attendeeIndex = event.attendees.findIndex((a) => a.id === id);
        if (attendeeIndex !== -1) {
          event.attendees.splice(attendeeIndex, 1);
          return true;
        }
      }
      return false;
    },
    createTag: (_: unknown, { name, color }: { name: string; color?: string }) => {
      const newTag: Tag = {
        id: uuidv4(),
        name
      };
      tags.push(newTag);
      return newTag;
    },
    addTagToEvent: (_: unknown, { eventId, tagId }: { eventId: string; tagId: string }) => {
      const event = events.find(e => e.id === eventId);
      const tag = tags.find(t => t.id === tagId);
      
      if (!event) {
        throw new Error(`Event with ID ${eventId} not found`);
      }
      
      if (!tag) {
        throw new Error(`Tag with ID ${tagId} not found`);
      }
      
      // Check if this tag is already added to the event
      const existingEventTag = eventTags.find(et => et.eventId === eventId && et.tagId === tagId);
      if (!existingEventTag) {
        eventTags.push({ eventId, tagId });
      }
      
      return {
        ...event,
        tags: getTagsForEvent(eventId)
      };
    },
    removeTagFromEvent: (_: unknown, { eventId, tagId }: { eventId: string; tagId: string }) => {
      const event = events.find(e => e.id === eventId);
      
      if (!event) {
        throw new Error(`Event with ID ${eventId} not found`);
      }
      
      const eventTagIndex = eventTags.findIndex(et => et.eventId === eventId && et.tagId === tagId);
      if (eventTagIndex !== -1) {
        eventTags.splice(eventTagIndex, 1);
      }
      
      return {
        ...event,
        tags: getTagsForEvent(eventId)
      };
    },
  },
};

// Helper function to get tags for an event
function getTagsForEvent(eventId: string): Tag[] {
  const tagIds = eventTags
  .filter(et => et.eventId === eventId)
  .map(et => et.tagId);
  console.log(' at appollo :; ',eventId,tagIds)
  
  return tags.filter(tag => tagIds.includes(tag.id));
}
