import {gql} from 'apollo-server-fastify';

const DEFAULT_PAGINATION_LIMIT = 20;

export default gql`
    # Types

    type Query {
        me: User!

        aesKey: AesKey!

        user ( id: ID! ): User!

        users (
            sort: Sort
            offset: Int = 0
            limit: Int = ${DEFAULT_PAGINATION_LIMIT}
        ): Users!

        code ( id: ID! ): Code!

        codes (
            offset: Int = 0
            limit: Int = ${DEFAULT_PAGINATION_LIMIT}
        ): Codes!

        note ( id: ID! ): Note!

        notes (
            filter: NotesFilter
            sort: Sort
            offset: Int = 0
            limit: Int = ${DEFAULT_PAGINATION_LIMIT}
        ): Notes!

        tag ( id: ID! ): Tag!

        tags (
            sort: Sort
            offset: Int = 0
            limit: Int = ${DEFAULT_PAGINATION_LIMIT}
        ): Tags!
    }
`;
