# Entities

This document describes a realistic data model for an event management system with the following relationships:
- Users can create and manage events (create, view, update, delete)
- Attendees can attend events, but they are not Users
- Each Event can have one or more Tags (e.g. "Internal", "Public", "Team Offsite")
- Attendees may attend multiple events, and their RSVP status should be tracked

## Entity Definitions

### User
- **id**: string (unique identifier, primary key)
- **name**: string (full name of the user)
- **email**: string (unique email address)
- **password**: string (hashed password)
- **createdAt**: date (when the user account was created)
- **updatedAt**: date (when the user account was last updated)

### Event
- **id**: string (unique identifier, primary key)
- **title**: string (title of the event)
- **description**: string (optional detailed description)
- **date**: date (when the event takes place)
- **location**: string (optional physical or virtual location)
- **creatorId**: string (reference to User.id, who created the event)
- **createdAt**: date (when the event was created)
- **updatedAt**: date (when the event was last updated)
- **isPublic**: boolean (whether the event is public or private)

### Attendee
- **id**: string (unique identifier, primary key)
- **name**: string (full name of the attendee)
- **email**: string (optional email address)
- **phone**: string (optional phone number)
- **createdAt**: date (when the attendee record was created)
- **updatedAt**: date (when the attendee record was last updated)

### EventAttendee (Join Entity)
- **id**: string (unique identifier, primary key)
- **eventId**: string (reference to Event.id)
- **attendeeId**: string (reference to Attendee.id)
- **rsvpStatus**: enum ["PENDING", "CONFIRMED", "DECLINED", "MAYBE"] (tracks the RSVP status)
- **rsvpDate**: date (when the RSVP status was last updated)
- **notes**: string (optional notes about this attendee for this event)
- **createdAt**: date (when the record was created)
- **updatedAt**: date (when the record was last updated)

### Tag
- **id**: string (unique identifier, primary key)
- **name**: string (unique name of the tag)
- **color**: string (optional color code for UI display)
- **createdAt**: date (when the tag was created)
- **updatedAt**: date (when the tag was last updated)

### EventTag (Join Entity)
- **id**: string (unique identifier, primary key)
- **eventId**: string (reference to Event.id)
- **tagId**: string (reference to Tag.id)
- **createdAt**: date (when the record was created)

## Constraints and Unique Identifiers

- **User.email**: Unique constraint to ensure no duplicate email addresses
- **Tag.name**: Unique constraint to ensure no duplicate tag names
- **EventAttendee**: Composite unique constraint on (eventId, attendeeId) to prevent duplicate attendee registrations
- **EventTag**: Composite unique constraint on (eventId, tagId) to prevent duplicate tag assignments

## Indexes

- **User.email**: Index for fast lookup by email during authentication
- **Event.creatorId**: Index to quickly find all events created by a specific user
- **Event.date**: Index to efficiently query upcoming or past events
- **EventAttendee.eventId**: Index to quickly find all attendees for a specific event
- **EventAttendee.attendeeId**: Index to quickly find all events an attendee is registered for
- **EventAttendee.rsvpStatus**: Index to filter attendees by their RSVP status
- **EventTag.eventId**: Index to quickly find all tags for a specific event
- **EventTag.tagId**: Index to quickly find all events with a specific tag

## Performance Considerations

1. **Pagination**: When retrieving events or attendees, implement pagination to limit the amount of data transferred.
2. **Selective Loading**: Use GraphQL to selectively load only the required fields.
3. **Denormalization**: For frequently accessed data, consider denormalizing certain fields (e.g., storing attendee count directly on the Event entity).
4. **Caching**: Implement caching for frequently accessed, relatively static data like event details and tags.
5. **Batch Operations**: Use batch operations for bulk updates to attendee statuses.

## Assumptions

1. **Authentication**: The system will use JWT or similar token-based authentication.
2. **Authorization**: Event creators have full CRUD permissions on their events, while other users may have read-only access.
3. **Soft Deletion**: Events and attendees are soft-deleted (marked as inactive) rather than permanently removed from the database.
4. **Email Notifications**: The system will send email notifications for event updates and RSVP confirmations.
5. **Scalability**: The data model is designed to handle thousands of events and attendees efficiently.
