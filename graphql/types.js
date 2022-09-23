const gql = require("graphql");

const HasBookModel = require("../model/has_book");
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

exports.PersonType = new gql.GraphQLObjectType({
    name: "person",
    fields: ()=>({
    _id:{
        type:gql.GraphQLString, 
    },
    first_name:{
        type: gql.GraphQLString,
    },
    last_name:{
        type: gql.GraphQLString,
    },
    hasBooks:{
        type: gql.GraphQLList(this.HasBookType), 
        resolve:async(parent)=>{
            return await HasBookModel.find({
                person_id: parent._id,
            })
        },
    },
})
})

exports.HasBookType = new gql.GraphQLObjectType({
    name: "has_book", 
    fields:()=>({
        _id:{
            type: gql.GraphQLString, 
        },
        book_id:{
            type: gql.GraphQLString,
        },
        person_id:{
            type: gql.GraphQLString,
        },
        from:{
            type: gql.GraphQLString,
        },
        to:{
            type: gql.GraphQLString, 
        },
        getBook:{
            type:this.BookType,
            resolve:async(parent, args)=>{
                return await bookModel.findOne({
                    id: parent.book_id
                })
            }
        }
    })
})