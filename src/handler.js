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

const editBookByIdHandler = async (req, res) => {
	const bookId = req.params.id;
	const { title, year, summary, publisher, pageCount, pageRead, reading } = req.body;
	const finished = pageRead === pageCount;
	const updatedAt = new Date().toISOString();

	try {
			if (!title) {
					res.status(400).send({ message: 'Gagal memperbarui buku. Title tidak boleh kosong.' });
					return;
			}

			if (pageRead > pageCount) {
					res.status(400).send({ message: 'Gagal memperbarui buku. pageRead tidak boleh lebih besar dari pageCount.' });
					return;
			}

			const result = await books.query(`
					UPDATE books
					SET title = $1, year = $2, summary = $3, publisher = $4, page_count = $5, page_read = $6, reading = $7, finished = $8, updated_at = $9
					WHERE id = $10
					RETURNING *
			`, [title, year, summary, publisher, pageCount, pageRead, reading, finished, updatedAt, bookId]);

			const updatedBook = result.rows;

			if (updatedBook.length === 0) {
					res.status(404).send({ message: 'Buku tidak ditemukan.' });
			} else {
					res.status(200).send({
							message: 'Buku berhasil diperbarui:',
							result: updatedBook
					});
			}
	} catch (err) {
			console.error(err);
			res.status(500).send({ message: 'Internal Server Error' });
	}
};

const deleteBookByIdHandler = async (req, res) => {
	const { bookId } = req.params.id;

	try {
		const result = await books.query(`
		DELETE FROM books
		 WHERE id = $1
		 RETURNING *
		 `, [bookId]);

		const deletedBook = result.rows;

		if (!deletedBook) {
			res.status(404).send({ 
				message: 'Buku tidak ditmukan.' 
			});
		}
		else {
			res.status(200).send({
				message: 'Buku berhasil dihapus.'
			});
		}
	}
	catch (err) {
		console.error(err);
		res.status(500).send({ 
			message: 'Internal Server Error' 
		});
	}
};

module.exports = { addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };