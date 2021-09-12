import {gql} from 'apollo-server-fastify';

export default gql`
    # Types

    "A main entity that owns notes, keys and tags."
    type User {
        id: ID!
        email: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type Users {
        offset: Int!
        limit: Int!
        total: Int!
        nodes: [User!]!
    }

    type LogoutPayload {
        status: Boolean!
    }

    type DeleteUserPayload {
        status: Boolean!
    }


    # Inputs

    input LoginInput {
        email: String!
        password: String!
    }

    input CreateUserInput {
        email: String!
        password: String!
    }

    input UpdateUserInput {
        email: String
    }

    input UsersSort {
        field: UsersSortField!
        direction: SortDirection! = ASC
    }


    # Enums

    enum UsersSortField {
        CREATED_AT
        UPDATED_AT
    }
`;
