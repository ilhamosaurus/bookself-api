const express = require('express');
const { addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require('./handler');
const router = express.Router();

router.post('/', addBookHandler);

router.get('/', getAllBookHandler);

router.get('/:id', getBookByIdHandler);

router.put('/:id', editBookByIdHandler);

router.delete('/:id', deleteBookByIdHandler);

module.exports = router;