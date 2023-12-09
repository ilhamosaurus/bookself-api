const express = require('express');
const { addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler } = require('./handler');
const router = express.Router();

router.post('/', addBookHandler);

router.get('/', getAllBookHandler);

router.get('/:id', getBookByIdHandler);

router.put('/:id', editBookByIdHandler);

module.exports = router;