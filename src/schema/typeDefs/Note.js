import {gql} from 'apollo-server-fastify';

export default gql`
    # Types

    "A note contains user's encrypted data."
    type Note {
        id: ID!
        code: Code!
        createdAt: Date!
        updatedAt: Date!
    }

    type Notes {
        offset: Int!
        limit: Int!
        total: Int!
        nodes: [Note!]!
    }

    type DeleteNotePayload {
        status: Boolean!
    }


    # Inputs

    input CreateNoteInput {
        code: CodeInput!
        tags: [ID!]
    }

    input UpdateNoteInput {
        code: CodeInput
        tags: [ID!]
    }

    input NotesFilter {
        tags: [ID!]!
    }
`;
