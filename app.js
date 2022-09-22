const xgql = require("express-graphql");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config()
mongoose.pluralize(null);


const bookModel = require("./model/book");
const authorModel = require("./model/author");
const graphqlSchema = require("./graphql/schema").schema;



run()
async function run() {
    await mongoose.connect(process.env.MONGODB_URI);
    express()
    .use("/graphql", xgql.graphqlHTTP({
        schema: graphqlSchema,
        graphiql: true,
    }))
    .listen(process.env.PORT,()=>{
        console.log("SerVerStarTed")
    })
    
}

async function popDB() {
    const authors = [
        { id: 1, first_name: 'J. K.', last_name: 'Rowling' },
        { id: 2, first_name: 'J. R. R.', last_name: ' Tolkien' },
        { id: 3, first_name: 'Brent ', last_name: 'Weeks' }
    ]

    const books = [
        { id: 1, name: 'Harry Potter and the Chamber of Secrets', author_id: 1 },
        { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', author_id: 1 },
        { id: 3, name: 'Harry Potter and the Goblet of Fire', author_id: 1 },
        { id: 4, name: 'The Fellowship of the Ring', author_id: 2 },
        { id: 6, name: 'The Return of the King', author_id: 2 },
        { id: 7, name: 'The Way of Shadows', author_id: 3 },
        { id: 8, name: 'Beyond the Shadows', author_id: 3 },
        { id: 5, name: 'The Two Towers', author_id: 2 },
    ]

    await bookModel.insertMany(books);
    await authorModel.insertMany(authors);

}
