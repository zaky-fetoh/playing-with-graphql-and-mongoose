const gql = require("graphql")
const mongoose = require("mongoose");

const types = require("./types")


const bookModel = require("../model/book");
const personModel = require("../model/person");
const AuthorModel = require("../model/author");
const hasBookModel = require("../model/has_book");

const Book_mutation = new gql.GraphQLObjectType({
    name: "mutation_ofBook",
    fields: () => ({
        addBook: {
            type: types.BookType,
            args: {
                name: {
                    type: gql.GraphQLString,
                },
                author_id: {
                    type: gql.GraphQLInt,
                },
                id: {
                    type: gql.GraphQLInt,
                },
            },
            resolve: async (parent, args) => {
                return await bookModel.create(args)
            },
        },
        deleteBook: {
            type: gql.GraphQLInt,
            args: {
                id: { type: gql.GraphQLInt },
            },
            resolve: async (parent, args) => {
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
    fields: () => ({
        addAuthor: {
            type: types.AuthorType,
            args: {
                first_name: {
                    type: gql.GraphQLString,
                },
                last_name: {
                    type: gql.GraphQLString,
                },
                id: {
                    type: gql.GraphQLInt,
                }
            },
            resolve: async (parent, args) => {
                return await AuthorModel.create(args);
            }
        },
        deleteAuthor: {
            type: gql.GraphQLInt,
            args: {
                id: { type: gql.GraphQLInt },
            },
            resolve: async (parant, args) => {
                console.log("dlt author");
                let results = await AuthorModel.deleteOne({
                    id: args.id,
                });
                return results.deletedCount;
            }
        }
    })
})


const PersonMutation = new gql.GraphQLObjectType({
    name: "personMutation",
    fields: {
        addPerson: {
            type: types.PersonType,
            args: {
                first_name: { type: gql.GraphQLString },
                last_name: { type: gql.GraphQLString },
            },
            resolve: async (parent, args) => {
                return await personModel.create(args);
            }
        },
        deletePerson: {
            type: gql.GraphQLInt,
            args: {
                id: { type: gql.GraphQLString, },
            },
            resolve: async (parent, args) => {
                console.log("dlt person")
                return (await personModel.deleteOne({
                    _id: mongoose.Types.ObjectId(args.id),
                })).deletedCount;
            }
        }
    }
})


const HasMutation = new gql.GraphQLObjectType({
    name: "hasBookMutaion",
    fields: () => ({
        addHasBook: {
            type: types.HasBookType,
            args: {
                book_id: { type: gql.GraphQLInt },
                person_id: { type: gql.GraphQLString },
                from: { type: gql.GraphQLInt },
                to: { type: gql.GraphQLInt },
            },
            resolve: async (parent, args) => {
                console.log(args);
                return await hasBookModel.create({
                    book_id: args.book_id,
                    person_id: args.person_id
                });
            },
        },
        deleteHasBook: {
            type: gql.GraphQLInt,
            args: {
                id: { type: gql.GraphQLString },
            },
            resolve: async (parent, args) => {
                return (await hasBookModel.deleteOne({
                    _id: args.id,
                })).deletedCount
            },
        }
    })
})




const RootMutation = new gql.GraphQLObjectType({
    name: "RootMutation",
    fields: {
        author: {
            type: AuthorMutation,
            resolve: () => AuthorMutation,
        },
        book: {
            type: Book_mutation,
            resolve: () => Book_mutation,
        },
        person: {
            type: PersonMutation,
            resolve: () => PersonMutation,
        },
        hasBook: {
            type: HasMutation,
            resolve: () => HasMutation,
        }
    }
})

module.exports = RootMutation;