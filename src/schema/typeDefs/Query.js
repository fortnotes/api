import {gql} from 'apollo-server-fastify';

export default gql`
    # Types

    type Query {
        me: User!

        aesKey: AesKey!

        user ( id: ID! ): User!

        users (
            sort: UsersSort
            offset: Int = 0
            limit: Int = 10
        ): Users!

        code ( id: ID! ): Code!

        codes (
            offset: Int = 0
            limit: Int = 10
        ): Codes!

        note ( id: ID! ): Note!

        notes (
            filter: NotesFilter
            sort: NotesSort
            offset: Int = 0
            limit: Int = 10
        ): Notes!

        tag ( id: ID! ): Tag!

        tags (
            sort: TagsSort
            offset: Int = 0
            limit: Int = 10
        ): Tags!
    }
`;
