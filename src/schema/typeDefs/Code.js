import {gql} from 'apollo-server-fastify';

export default gql`
    # Types

    "Encrypted data with a specific AES key."
    type Code {
        id: ID!
        aesKey: AesKey!
        iv: InitializationVector!
        em: EncryptedMessage!
        size: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type Codes {
        offset: Int!
        limit: Int!
        total: Int!
        nodes: [Code!]!
    }

    type DeleteCodePayload {
        status: Boolean!
    }


    # Inputs

    input CodeInput {
        aesKey: ID!
        iv: InitializationVector!
        em: EncryptedMessage!
    }
`;
