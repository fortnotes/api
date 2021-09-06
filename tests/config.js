const {env} = process;


export default {
    apiEndpoint: env.FORTNOTES_API_ENDPOINT || 'http://localhost:4000/graphql'
};
