const express = require('express');
const { addBookHandler } = require('./handler');
const router = express.Router();

router.post('/', addBookHandler);

module.exports = router;