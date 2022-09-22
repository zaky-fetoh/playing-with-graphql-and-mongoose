const gql = require("graphql");
const authorModel = require('../model/author');
const bookModel = require("../model/book");

exports.AuthorType = new gql.GraphQLObjectType({
    name: "author", 
    fields:()=>({
        first_name:{
            type: gql.GraphQLString,
        },
        last_name:{
            type: gql.GraphQLString,
        },
        id:{
            type: gql.GraphQLInt,
        },
        _id:{
            type: gql.GraphQLString,
        },
        books:{
            type: gql.GraphQLList(this.BookType),
            resolve: async (parent)=>{
                return await bookModel.find({
                    author_id: parent.id
                })
            }
        },
    })
})


exports.BookType = new gql.GraphQLObjectType({
    name: "book",
    fields:()=>({
        name:{
            type: gql.GraphQLString,
        },
        author_id:{            
            type: gql.GraphQLString,
        },
        id:{
            type: gql.GraphQLInt,
        },
        _id:{
            type: gql.GraphQLString
        },
        author:{
            type: this.AuthorType,
            resolve: async (parent)=>{
                return await authorModel.findOne({
                    id:parent.author_id,
                })
            }
        }
    })
})