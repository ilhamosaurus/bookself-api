const express = require('express');
const { addBookHandler, getAllBookHandler } = require('./handler');
const router = express.Router();

router.post('/', addBookHandler);

router.get('/', getAllBookHandler);

module.exports = router;