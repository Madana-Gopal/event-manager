import { useQuery, useMutation } from '@apollo/client';
import {
  GET_EVENT,
} from '@/graphql/operations';

export function useEvent(eventId: string) {
  const {
    loading,
    error,
    data,
    refetch,
  } = useQuery(GET_EVENT, {
    variables: { id: eventId },
    fetchPolicy: 'network-only',
  });

//   const [addAttendee] = useMutation(ADD_ATTENDEE);
//   const [removeAttendee] = useMutation(REMOVE_ATTENDEE);
//   const [addTagToEvent] = useMutation(ADD_TAG_TO_EVENT);
//   const [removeTagFromEvent] = useMutation(REMOVE_TAG_FROM_EVENT);

  return {
    event: data?.event,
    loading,
    error,
    refetch,
  };
}
