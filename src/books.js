const { Client } = require('pg');

const books = new Client({
  host: '', //insert you hostname
  user: '', //insert username for postgres db
  port: '', //insert your port for postgres db
  password: '', //insert your password for postgres db
  database: '' //insert you db name
});

module.exports = books;
