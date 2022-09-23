const gql = require("graphql")
const types = require("./types")

const bookModel = require("../model/book"); 
const AuthorModel = require("../model/author");
const personModel = require("../model/person");

const Book_mutation = new gql.GraphQLObjectType({
    name: "mutation_ofBook", 
    fields:()=>({
        addBook:{
            type: types.BookType,
            args:{
                name:{
                    type: gql.GraphQLString,
                },
                author_id:{
                    type: gql.GraphQLInt,
                },
                id:{
                    type:gql.GraphQLInt,
                },
            },
            resolve: async(parent, args)=>{
                return await bookModel.create(args)
            },
        },
        deleteBook:{
            type: gql.GraphQLInt,
            args:{
                id: {type:gql.GraphQLInt},
            },
            resolve:async(parent, args)=>{
                let results = await bookModel.deleteOne({
                    id: args.id,
                });
                return results.deletedCount;
            }
        },
    })
});

const AuthorMutation = new gql.GraphQLObjectType({
    name: "AutherMutation", 
    fields:()=>({
        addAuthor:{
            type:types.AuthorType,
            args:{
                first_name: {
                    type: gql.GraphQLString,
                },
                last_name: {               
                    type: gql.GraphQLString,
                },
                id:{
                    type: gql.GraphQLInt,
                }
            },
            resolve:async(parent, args)=>{
                return await AuthorModel.create(args); 
            }
        },
        deleteAuthor:{
            type: gql.GraphQLInt,
            args:{
                id: {type: gql.GraphQLInt}, 
            },
            resolve:async(parant, args)=>{
                console.log("dlt author");
                let results = await AuthorModel.deleteOne({
                    id: args.id, 
                });
                return results;
            }
        }
    })
})


const PersonMutation = new gql.GraphQLObjectType({
    name: "personMutation", 
    fields:{
        addPerson:{
            type: types.PersonType, 
            args:{
                first_name: {type:gql.GraphQLString}, 
                last_name:{type: gql.GraphQLString}, 
            },
            resolve: async(parent, args)=>{
                return await personModel.create(args);
            }
        },
        deletePerson: {
            type: gql.GraphQLInt,
            args:{
                id:{type: gql.GraphQLString,},
            },
            resolve:async(parent, args)=>{
                return await personModel.deleteOne({
                    _id: args.id,
                });
            }
        }
    }
})


co



const RootMutation = new gql.GraphQLObjectType({
    name: "RootMutation", 
    fields:{
        author:{
            type: AuthorMutation,
            resolve:()=>AuthorMutation,
        },
        book:{
            type:Book_mutation,
            resolve: ()=> Book_mutation,
        },
        person:{
            type: PersonMutation, 
            resolve : ()=> PersonMutation,
        }
    }
})

module.exports = RootMutation;