import {gql} from 'apollo-server-fastify';

const defaultPaginationLimit = 20;

export default gql`
    # Types

    type Query {
        me: User!

        aesKey: AesKey!

        user ( id: ID! ): User!

        users (
            sort: Sort
            offset: Int = 0
            limit: Int = ${defaultPaginationLimit}
        ): Users!

        code ( id: ID! ): Code!

        codes (
            offset: Int = 0
            limit: Int = ${defaultPaginationLimit}
        ): Codes!

        note ( id: ID! ): Note!

        notes (
            filter: NotesFilter
            sort: Sort
            offset: Int = 0
            limit: Int = ${defaultPaginationLimit}
        ): Notes!

        tag ( id: ID! ): Tag!

        tags (
            sort: Sort
            offset: Int = 0
            limit: Int = ${defaultPaginationLimit}
        ): Tags!
    }
`;
