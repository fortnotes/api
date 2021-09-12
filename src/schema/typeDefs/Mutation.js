import {gql} from 'apollo-server-fastify';

export default gql`
    # Types

    type Mutation {
        login ( input: LoginInput! ): User!

        logout: LogoutPayload!

        createUser ( input: CreateUserInput! ): User!

        updateUser ( id: ID! input: UpdateUserInput! ): User!

        deleteUser ( id: ID! ): DeleteUserPayload!

        createCode ( input: CodeInput! ): Code!

        updateCode ( id: ID! input: CodeInput! ): Code!

        deleteCode ( id: ID! ): DeleteCodePayload!

        createNote ( input: CreateNoteInput! ): Note!

        updateNote ( id: ID! input: UpdateNoteInput! ): Note!

        deleteNote ( id: ID! ): DeleteNotePayload!

        createTag ( input: TagInput! ): Tag!

        updateTag ( id: ID! input: TagInput! ): Tag!

        deleteTag ( id: ID! ): DeleteTagPayload!
    }
`;
