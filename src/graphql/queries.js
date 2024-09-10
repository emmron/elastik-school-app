export const listStudents = /* GraphQL */ `
  query ListStudents {
    listStudents {
      items {
        id
        firstName
        lastName
        email
        dob
      }
    }
  }
`;