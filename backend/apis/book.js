var Book = require('../models/Book')

function getBooks (req, res) {
  Book.getBooks()
  .then((books) => {
    res.json({success: true, books})
  }).catch((err) => {
    res.json({success: false, err: err})
  });
}

function newBook (req, res) {

  req.assert('title', 'Title cannot be blank').notEmpty();
  req.assert('author', 'Author cannot be blank').notEmpty();


  var errors = req.validationErrors();

	if (errors) {
		return res.status(500).json({ success: false, message: "Validation failed", errors: errors });
  }
  
  var newBook = {
    title: req.body.title,
    author: req.body.author
  }

  Book.createNewBook(newBook)
  .then((result) => {
    res.json({success: true, books: result})    
  }).catch((err) => {
    res.json({success: false, err: err})    
  });
}

function editBook (req, res) {
  var bookID = req.body.bookID
  var updatedBook = req.body.book

  req.assert('bookID', 'Book ID cannot be blank').notEmpty();
  req.assert('book', 'Book cannot be blank').notEmpty();

  var errors = req.validationErrors();

	if (errors) {
		return res.status(500).json({ success: false, message: "Validation failed", errors: errors });
  }

  Book.editBookInfo(bookID, updatedBook)
  .then(updated => {
    return Book.find();
  })
  .then(books => {
    return res.json({success: true, books: updated})
  })
  .catch((err) => {
    return res.json({success: false, err: err})        
  });
}

function deleteBook (req, res) {
  var bookID = req.body.bookID

  req.assert('bookID', 'Book ID cannot be blank').notEmpty();

  var errors = req.validationErrors();

	if (errors) {
		return res.status(500).json({ success: false, message: "Validation failed", errors: errors });
  }

  Book.deleteBook(bookID)
  .then((deleted) => {
    return Book.find()
  })
  .then((books) => {
    return res.json({success: true, books})
  })
  .catch((err) => {
    return res.json({success: false, err: err})        
  });
}

module.exports = {
  getBooks,
  newBook,
  editBook,
  deleteBook
}