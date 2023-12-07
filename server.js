const express = require('express');
const bodyPaser = require('body-parser');
const app = express();
const books = require('./books');

app.listen(3200, () => {
    console.log('Server running in port 3200');
});

books.connect(err => {
    if (!err)
			console.log('Connected');
});