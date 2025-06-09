import { gql } from '@apollo/client';



// Queries
export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      date
      attendees {
        id
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      title
      date
      attendees {
        id
        name
        email
      }
      tags {
        id
        name
     
      }
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
     
    }
  }
`;

// Mutations
export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $date: String!,$selectedTags: [String!]) {
    createEvent(title: $title, date: $date,selectedTags: $selectedTags) {
      id
      title
      date
    }
  }
`;

export const ADD_ATTENDEE = gql`
  mutation AddAttendee($eventId: ID!, $name: String!, $email: String) {
    addAttendee(eventId: $eventId, name: $name, email: $email) {
      id
      name
      email
     
    }
  }
`;

export const REMOVE_ATTENDEE = gql`
  mutation RemoveAttendee($id: ID!) {
    removeAttendee(id: $id)
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($name: String!, $color: String) {
    createTag(name: $name, color: $color) {
      id
      name
     
    }
  }
`;

export const ADD_TAG_TO_EVENT = gql`
  mutation AddTagToEvent($eventId: ID!, $tagId: ID!) {
    addTagToEvent(eventId: $eventId, tagId: $tagId) {
      id
      title
      tags {
        id
        name
       
      }
    }
  }
`;

export const REMOVE_TAG_FROM_EVENT = gql`
  mutation RemoveTagFromEvent($eventId: ID!, $tagId: ID!) {
    removeTagFromEvent(eventId: $eventId, tagId: $tagId) {
      id
      title
      tags {
        id
        name
     
      }
    }
  }
`;
