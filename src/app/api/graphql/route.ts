import { NextRequest } from 'next/server';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export async function GET() {
  return new Response('GraphQL API is running. Use POST to query.', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { query, variables, operationName } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({
          errors: [{ message: 'GraphQL query is required' }],
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Execute the GraphQL operation
    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
      operationName,
    });
    
    // Return the result
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('GraphQL execution error:', error);
    
    return new Response(
      JSON.stringify({
        errors: [{ message: error instanceof Error ? error.message : 'Unknown error occurred' }],
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
