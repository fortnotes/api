import {gql} from 'apollo-server-fastify';

export default gql`
    # Types

    type Tag {
        id: ID!
        code: Code!
        usages: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type Tags {
        offset: Int!
        limit: Int!
        total: Int!
        nodes: [Tag!]!
    }

    type DeleteTagPayload {
        status: Boolean!
    }


    # Inputs

    input TagInput {
        code: CodeInput!
    }
`;
