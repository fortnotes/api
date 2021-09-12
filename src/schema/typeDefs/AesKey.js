import {gql} from 'apollo-server-fastify';

export default gql`
    # Types

    "AES key used by User for encryption/decryption."
    type AesKey {
        id: ID!
        "Base64 string (e.g. kCRvxYAc4AwhC0k9)"
        salt: String!
        "PBKDF2 SHA-256 iterations."
        iterations: Int!
        em: EncryptedMessage!
        createdAt: Date!
        updatedAt: Date!
    }
`;
