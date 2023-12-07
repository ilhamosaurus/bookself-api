const express = require('express');
const bodyParser = require('body-parser');
const router = require('./route');
const books = require('./books');
const app = express();

app.use(bodyParser.json())

books.connect(err => {
	if (err){
		console.log(err.message);
	}
	else {
		console.log('Connected');
	}
})

const init = async () => {
	const server = app.listen(3200, () =>
	console.log('Server running on 3200')
	);

	app.use('/books', router);

	server.emit();
};

init();