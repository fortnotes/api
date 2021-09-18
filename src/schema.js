import {gql} from 'apollo-server-fastify';

export default gql`
    "An ISO-8601 encoded date string (e.g. 2011-10-05T14:48:00.000Z)."
    scalar Date

    "Base64 string."
    scalar InitializationVector

    "Base64 string."
    scalar EncryptedMessage


    "AES key used by User for encryption/decryption."
    type AesKey {
        id: ID!
        code: Code!
        "Base64 string (e.g. kCRvxYAc4AwhC0k9)"
        salt: String!
        "PBKDF2 SHA-256 iterations."
        iterations: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    "Encrypted data with a specific AES key."
    type Code {
        id: ID!
        aesKey: AesKey
        iv: InitializationVector!
        em: EncryptedMessage!
        size: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    "A main entity that owns notes, keys and tags."
    type User {
        id: ID!
        email: String!
        aesKey: AesKey!
        createdAt: Date!
        updatedAt: Date!
    }

    "A note contains user's encrypted data."
    type Note {
        id: ID!
        code: Code!
        createdAt: Date!
        updatedAt: Date!
    }

    # type AuthPayload {
    #     token: String!
    #     user: User!
    # }


    type Query {
        user: User!

        codes: [Code!]!
        code (id: ID!): Code

        notes: [Note!]!
        note (id: ID!): Note
    }


    type Mutation {
        login (
            email: String!
            password: String!
        ): User!

        createUser (
            email: String!
            password: String!
            #aesKey: AesKey!
        ): User!

        createNote (
            text: String
            #code: Code!
        ): Note!
    }
`;
