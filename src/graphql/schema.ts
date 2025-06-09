import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    date: String!
    attendees: [Attendee!]!
    tags: [Tag!]!
  }

  type Attendee {
    id: ID!
    name: String!
    email: String
    eventId: ID!
  }

  type Tag {
    id: ID!
    name: String!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
    tags: [Tag!]!
  }

  type Mutation {
    createEvent(title: String!, date: String!, selectedTags: [String!]): Event!
    addAttendee(eventId: ID!, name: String!, email: String): Attendee!
    removeAttendee(id: ID!): Boolean!
    createTag(name: String!, color: String): Tag!
    addTagToEvent(eventId: ID!, tagId: ID!): Event!
    removeTagFromEvent(eventId: ID!, tagId: ID!): Event!
  }
`;
