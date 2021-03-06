import { 
  GET_BOOKS,
  EDIT_BOOK,
  DELETE_BOOK,
  ADD_BOOK } from '../actions/types';
  
  const initialState = {
    books: [] }

  export default function(state=initialState, action) {
    switch (action.type) {
      case GET_BOOKS:
        return { ...state, books: action.payload }
      case EDIT_BOOK:
        return { ...state, books: action.payload }
      case DELETE_BOOK:
        return { ...state, books: action.payload }
      case ADD_BOOK:
        return { ...state, books: action.payload }
      default:
        return state
    }
  }