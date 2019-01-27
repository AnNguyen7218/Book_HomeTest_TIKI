const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  published_date: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  thumbnail: {
    type: String,
    default: 'https://source.unsplash.com/random/200x300'
  },
  type: {
    type: String,
    default: 'Various'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

BookSchema.index({ title: 1 })

function findByType(cb) {
  return this.model('book').find({
    type: this.type
  }, cb);
};


function findBooksWithType(type, cb) {
  return Book.find({
    type
  });
};

function createNewBook(book) {
  return Book.create(book)
}

function deleteBook(bookID) {
  return Book.update({
    _id: bookID
  }, {
    isDeleted: true
  })
}

function editBookInfo(info) {
  var book = this

  for(var key in info) {
    book[key] = info[key]
  }

  return book.model('book').update({
    _id: book._id
  },{
    book
  })
}

function getBooks () {
  return Book.find()
}

BookSchema.methods = {
  findByType,
  editBookInfo
}

BookSchema.statics = {
  createNewBook,
  findBooksWithType,
  deleteBook,
  getBooks
}

const Book = mongoose.model('book', BookSchema);

module.exports = Book;