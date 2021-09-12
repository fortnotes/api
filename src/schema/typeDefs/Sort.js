import apollo from 'apollo-server-fastify';

const {gql} = apollo;

export default gql`
    # Enums

    enum SortDirection {
        ASC
        DESC
    }
`;
