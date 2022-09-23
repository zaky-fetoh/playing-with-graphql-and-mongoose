const types = require("./types");
const gql = require("graphql");

const bookModel = require("../model/book");
const authorModel = require("../model/author");
const personModel = require("../model/person");


exports.RootQuery = new gql.GraphQLObjectType({
    name: "Root_query",
    fields: () => ({
        getBooks: {
            type: gql.GraphQLList(types.BookType),
            resolve: async () => {
                return await bookModel.find({})
            }
        },
        getAuthors: {
            type: gql.GraphQLList(types.AuthorType),
            resolve: async () => {
                return await authorModel.find({});
            },
        },
        getAuthor: {
            type: types.AuthorType,
            args: {
                id: {type:gql.GraphQLInt},
            },
            resolve: async (parent, args) => {
                return await authorModel.findOne({
                    id: args.id,
                })
            }
        },
        getBook: {
            type: types.BookType,
            args: { id: {type:gql.GraphQLInt} },
            resolve: async (parent, args) => {
                return await bookModel.findOne({
                    id: args.id,
                })
            }
        },
        getPerson:{
            type: gql.GraphQLList(types.PersonType), 
            resolve:async()=>{
                return await personModel.find({}); 
            },
        },
    }),
});