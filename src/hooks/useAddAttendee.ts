// hooks/mutations/useAddAttendee.ts
import { useMutation } from '@apollo/client';
import { ADD_ATTENDEE } from '@/graphql/operations';

export function useAddAttendee(refetch?: () => void) {
  const [addAttendee, { data, loading, error }] = useMutation(ADD_ATTENDEE,{
    onCompleted: () => {
      if (refetch) refetch();
    },
  });

  return {
    addAttendee,
    data,
    loading,
    error,
  };
}
