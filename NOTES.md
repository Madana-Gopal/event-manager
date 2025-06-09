# Notes

This document outlines the assumptions made during development and any known issues with the Event Manager application.

## Assumptions

1. **In-Memory Storage**: The application uses in-memory storage for the GraphQL server, which means data will be lost when the server restarts. In a production environment, this would be replaced with a persistent database.

2. **Authentication**: The application does not implement authentication or authorization. In a real-world scenario, these would be essential features.

3. **Date Handling**: The application uses simple string-based date handling. A more robust solution would use proper date objects and timezone handling.

4. **Error Handling**: Basic error handling is implemented, but a production application would need more comprehensive error handling and logging.

5. **Form Validation**: Basic form validation is implemented using Zod and Formik, but more extensive validation would be needed in a production environment.

6. **Responsive Design**: The UI is designed to be responsive, but has been primarily optimized for desktop viewing.

7. **GraphQL Integration**: The application uses Apollo Server with Next.js App Router, which required some custom integration code. In a production environment, a more robust solution might be needed.

## Implementation Decisions

1. **Apollo Client vs React Query**: Apollo Client was chosen for GraphQL integration due to its comprehensive feature set and tight integration with GraphQL.

2. **Formik for Forms**: Formik was used for form handling as specified in the requirements, providing a clean way to manage form state and validation.

3. **Zod for Validation**: Zod was chosen for validation due to its TypeScript integration and ease of use with Formik.

4. **Tailwind CSS**: Tailwind CSS was used for styling as specified in the requirements, allowing for rapid UI development.

5. **Next.js App Router**: The App Router was used as specified in the requirements, providing a modern routing solution with server components.

## Known Issues

1. **Apollo Client SSR**: There might be hydration mismatches between server and client rendering with Apollo Client in the App Router. This is a known issue with Apollo Client and Next.js App Router.

2. **Form Reset**: After submitting a form, the form is reset, but there's no visual feedback to the user that the action was successful.

3. **Error States**: While basic error handling is implemented, the error messages could be more user-friendly.

4. **Loading States**: Basic loading states are implemented, but more sophisticated loading indicators would improve the user experience.

5. **Optimistic UI**: The application does not implement optimistic UI updates, which would improve the perceived performance.

## Future Improvements

1. **Authentication**: Add user authentication and authorization.

2. **Persistent Storage**: Replace in-memory storage with a database.

3. **Optimistic UI**: Implement optimistic UI updates for a better user experience.

4. **Comprehensive Testing**: Add unit, integration, and end-to-end tests.

5. **Enhanced Form Validation**: Add more comprehensive form validation.

6. **Improved Error Handling**: Enhance error handling and provide more user-friendly error messages.

7. **Pagination**: Add pagination for the events list.

8. **Search and Filtering**: Add search and filtering capabilities.

9. **Event Categories/Tags**: Implement the tag system described in the ENTITIES.md file.

10. **RSVP Status**: Implement the RSVP status tracking described in the ENTITIES.md file.
