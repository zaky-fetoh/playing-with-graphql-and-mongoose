const gql = require("graphql");
const RootQuery  = require("./query").RootQuery

const schema = new gql.GraphQLSchema({
        query: RootQuery,
})

exports.schema = schema; 