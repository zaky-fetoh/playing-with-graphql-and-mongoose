const gql = require("graphql");

const RootQuery  = require("./query").RootQuery
const RootMutation = require("./mutation");

const schema = new gql.GraphQLSchema({
        query: RootQuery,
        mutation: RootMutation,
})

exports.schema = schema; 