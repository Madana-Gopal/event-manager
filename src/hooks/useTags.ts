import { useQuery } from '@apollo/client';
import { GET_TAGS } from '@/graphql/operations';

export function useTags() {
  const { data, loading, error, refetch } = useQuery(GET_TAGS);

  return {
    tags: data?.tags || [],
    loading,
    error,
    refetch,
  };
}
