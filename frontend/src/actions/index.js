import axios from 'axios';
import { 
  GET_BOOKS,
  EDIT_BOOK,
  DELETE_BOOK,
  ADD_BOOK } from './types';

const ROOT_URL = 'http://localhost:8000';
axios.defaults.baseURL = ROOT_URL;

export function getBooks () {
  return function (dispatch) {
    axios.get('/books')
    .then((res) => {    
      if(res.data.success) {
        dispatch({
          type: GET_BOOKS,
          payload: res.data.books
        })
      }
    }).catch((err) => {
      console.log(err)
    });
  }
}

export function addBook (book) {
  return function (dispatch) {
    axios.post('/books/new',book)
    .then((res) => {
      if (res.data.success)
        dispatch({
          type: ADD_BOOK,
          payload: res.data.book
        })
    }).catch((err) => {
      console.log(err)      
    });
  }
}

export function editBook (bookID, updatedBook) {
  return function (dispatch) {
    axios.post('/books/edit', {bookID, book: updatedBook})
    .then((res) => {
      if (res.data.success)
      dispatch({
        type: EDIT_BOOK,
        payload: res.data.book
      })
    }).catch((err) => {
      console.log(err)            
    });
  }
}

export function deleteBook (bookID) {
  return function (dispatch) {
    axios.post('/books/delete',bookID)
    .then((res) => {
      if (res.data.success)
        dispatch({
          type: DELETE_BOOK,
          payload: res.data.book
        })
    }).catch((err) => {
      console.log(err)
    });
  }
}
 