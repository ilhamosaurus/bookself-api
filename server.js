const express = require('express');
const bodyPaser = require('body-parser');
const app = express();

const init = async () => {
	const server = app.listen(3200, 'localhost', () =>
	console.log('Server running on 3200')
	);

	server.emit();
};

init();