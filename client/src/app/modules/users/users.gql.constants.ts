
import gql from 'graphql-tag';

export const queryUsers = gql`
query users {
  users {
    id
    firstName
    lastName
    login
    email
  }
}
`;

export const queryUser = gql`
query user($id: ID!) {
  user(id: $id) {
    id
    firstName
    lastName
    login
    email
  }
}
`;

export const createUser = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $login: String!
    $password: String!
  ) {
    createUser(
      createUserInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        login: $login
        password: $password
      }
    ) {
      firstName
      lastName
      login
      email
    }
  }
`;

export const updateUser = gql`
mutation updateUser(
  $id: ID!
  $firstName: String!
  $lastName: String!
  $email: String!
  $login: String!
) {
  updateUser(
    updateUserInput: {
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      login: $login
    }
  ) {
    id
    firstName
    lastName
    login
    email
  }
}
`;

export const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const deleteUsers = gql`
  mutation deleteUsers($ids: [ID!]) {
    deleteUsers(ids: $ids)
  }
`;
