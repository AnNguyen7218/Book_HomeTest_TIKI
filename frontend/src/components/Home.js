import React, { Component } from 'react';
import {connect} from 'react-redux';

import { getBooks } from '../actions'
import Book from './Book'

class Home extends Component {

  componentDidMount() {
    this.props.getBooks();
  }

  render () {
    let s = this.props;
    return (
      <div className="container">
        <h3>
          Today Books
        </h3>
        <div className='row'>
          {s.books.map((book, index) => 
            ((!book.isDeleted)?<Book key={index} book = {book}/>:'')
          )}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    books: state.booksReducer.books
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBooks: () => dispatch(getBooks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)