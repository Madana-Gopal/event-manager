# Setup Instructions

This document provides instructions for setting up and running the Event Manager application.

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Madana-Gopal/event-manager.git
   cd event-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

The application includes both a Next.js frontend and a GraphQL API (integrated within the Next.js app).

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

This will start the Next.js development server at [http://localhost:3000](http://localhost:3000).

### Production Mode

To build and run the application in production mode:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Application Structure

- `/src/app`: Next.js App Router pages
  - `/events`: Events listing page
  - `/events/new`: Create new event page
  - `/events/[id]`: Event details page
  - `/api/graphql`: GraphQL API endpoint

- `/src/components`: React components
- `/src/graphql`: GraphQL schema, resolvers, and operations
- `/src/lib`: Utility functions and configuration

## GraphQL API

The GraphQL API is accessible at `/api/graphql`. You can use tools like Apollo Studio or GraphQL Playground to explore the API.

### Available Queries

- `events`: Get a list of all events
- `event(id: ID!)`: Get details of a specific event

### Available Mutations

- `createEvent(title: String!, date: String!)`: Create a new event
- `addAttendee(eventId: ID!, name: String!, email: String)`: Add an attendee to an event
- `removeAttendee(id: ID!)`: Remove an attendee from an event

## Features

- View a list of events
- Create a new event
- View event details (including attendees)
- Add/remove attendees
