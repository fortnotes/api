import {gql} from 'apollo-server-fastify';

export default gql`
    # Inputs

    input Sort {
        field: SortField!
        direction: SortDirection! = ASC
    }


    # Enums

    enum SortField {
        CREATED_AT
        UPDATED_AT
    }

    enum SortDirection {
        ASC
        DESC
    }
`;
