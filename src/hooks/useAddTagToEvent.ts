import { useMutation } from '@apollo/client';
import { ADD_TAG_TO_EVENT } from '@/graphql/operations';

export function useAddTagToEvent(refetch?: () => void) {
  const [addTagToEvent, { data, loading, error,}] = useMutation(ADD_TAG_TO_EVENT,{
    onCompleted: () => {
      if (refetch) refetch();
    },
  });

  return { addTagToEvent, data, loading, error };
}
