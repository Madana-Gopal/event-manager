'use client';

import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import { ReactNode } from 'react';

export function ApolloProvider({ children }: { children: ReactNode }) {
  const client = getClient();

  return (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  );
}
