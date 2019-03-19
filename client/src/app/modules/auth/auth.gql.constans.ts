import gql from 'graphql-tag';

export const signIn = gql`
mutation signIn($login: String!, $password: String!) {
  signIn(login: $login, password: $password) {
    token
  }
}
`;

export const signUp = gql`
mutation signUp(
  $firstName: String!,
  $lastName: String!,
  $email: String!,
  $login: String!,
  $password: String!
  ) {
  signUp(
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    login: $username,
    password: $password
    ) {
    token
  }
}
`;
