// hooks/mutations/useAddAttendee.ts
import { useMutation } from '@apollo/client';
import { REMOVE_ATTENDEE } from '@/graphql/operations';

export function useRemoveAttendee(refetch?: () => void) {
  const [removeAttendee, { data, loading, error }] = useMutation(REMOVE_ATTENDEE,{
    onCompleted: () => {
      if (refetch) refetch();
    },
  });

  return {
    removeAttendee,
    data,
    loading,
    error,
  };
}
