var express = require('express');
var router = express.Router();
var bookAPI = require('../apis/book')

/* GET books listing. */
router.get('/', bookAPI.getBooks)
router.post('/new', bookAPI.newBook)
router.post('/edit', bookAPI.editBook)
router.delete('/delete', bookAPI.deleteBook)

module.exports = router;
