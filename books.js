const { Client } = require('pg');

const books = new Client({
    host: "localhost",
    user: "porto",
    port: "6969",
    password: "12345678",
    database: "crud_books"
});

module.exports = books;