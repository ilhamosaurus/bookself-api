const express = require('express');
const { addBookHandler, getAllBookHandler, getBookByIdHandler } = require('./handler');
const router = express.Router();

router.post('/', addBookHandler);

router.get('/', getAllBookHandler);

router.get('/:id', getBookByIdHandler);

module.exports = router;