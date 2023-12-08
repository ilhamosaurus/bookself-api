const books = require('./books');

const addBookHandler = (req, res) => {
	const { title, year, summary, publisher, pageCount, pageRead, reading } = req.body;
	const finished = pageCount === pageRead;
	const inseretedAt = new Date().toISOString();
	const updatedAt = inseretedAt;

	if (!title) {
		res.status(400);
		return res.send({ message: 'Gagal menambahkan buku. Mohon isi nama buku' });
	}

	if (pageRead > pageCount) {
		res.status(400);
		return res.send({ message: 'Mohon masukan jumlah halaman yang benar' });
	}

	books.query((`INSERT INTO books(title, year, summary, publisher, page_count, page_read, reading, finished, inserted_at, updated_at) 
		VALUES('${title}', '${year}', '${summary}', '${publisher}', ${pageCount}, ${pageRead}, ${reading}, ${finished}, '${inseretedAt}', '${updatedAt}') RETURNING *`), 
		(err, result) => {
		var newBook = result.rows[0];

		if (err) {
			res.status(401).json(err.message);
		}
		else {
			res.status(200);
			res.send({ 
				message: 'Buku berhasil ditambahkan.',
				result: newBook
			});
		}
	});
}

const getAllBookHandler = (req, res) => {
	books.query((`SELECT * FROM books`), (err, result) => {
		const getAllBooks = result.rows;

		if (!getAllBooks) {
			res.status(404);
			res.send({ message: 'Tidak ada buku tersedia.'});
		}

		if (err) {
			res.status(401).json(err.message);
		}
		else {
			res.status(200);
			res.send({
				message: 'Daftar buku tersedia:',
				result: getAllBooks
			})
		}
	});
}

const getBookByIdHandler = (req, res) => {
	const bookId = req.params.id;

	books.query((`SELECT * FROM books WHERE id = ${bookId}`), (err, result) => {
		const bookById = result.rows;

		if (!bookById) {
			res.status(404);
			res.send({ message: 'Buku tidak ditemukan.' });
		}

		if (err) {
			res.status(401).json(err.message);
		}
		else {
			res.status(200);
			res.send({
				message: 'Buku ditemukan:',
				result: bookById
			});
		}
	});
}

module.exports = { addBookHandler, getAllBookHandler, getBookByIdHandler };