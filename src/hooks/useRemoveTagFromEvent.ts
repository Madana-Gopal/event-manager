import { useMutation } from '@apollo/client';
import { REMOVE_TAG_FROM_EVENT } from '@/graphql/operations';

export function useRemoveTagFromEvent(refetch?: () => void) {
  const [removeTagFromEvent, { data, loading, error }] = useMutation(REMOVE_TAG_FROM_EVENT,{
    onCompleted: () => {
      if (refetch) refetch();
    },
  });

  return { removeTagFromEvent, data, loading, error };
}
