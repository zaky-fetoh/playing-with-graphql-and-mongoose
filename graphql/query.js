const types = require("./types");
const gql = require("graphql");

const bookModel = require("../model/book");
const authorModel = require("../model/author");


exports.RootQuery =new gql.GraphQLObjectType({
    name: "Root_query",
    fields:()=>({
        getBooks:{
            type:  gql.GraphQLList(types.BookType),
            resolve: async ()=>{
                return await bookModel.find({})
            }
        },
        getAuthors:{
            type: gql.GraphQLList(types.AuthorType), 
            resolve: async ()=>{
                return await authorModel.find({});
            },
        },
    }),
});