import React, { Component } from 'react';
import {connect} from 'react-redux';

import { getBooks } from '../actions'

import Book from './Book'

class Home extends Component {
  constructor() {
    super();

    this.state = {
      books : []
    }

    this.getBooks = this.getBooks.bind(this)
  }
  componentWillMount () {
    this.props.dispatch(getBooks())
    console.log(this.props)
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks () {
    fetch('http://localhost:8000/books')
    .then(response => response.json())
    .then((result) => {
      console.log('result', result)
      if(result.success)
        this.setState({
          books: result.books
        });
    }).catch((err) => {
      console.log(err)
    });
  }

  render () {
    let s = this.state;
    return (
      <div className="container">
        <h3>
          Today Books
        </h3>
        <div className='row'>
          {s.books.map((book, index) => 
            (<Book book = {book}/>)
          )}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    book: state.book
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     getBooks: () => dispatch(getBooks())
//   }
// }

export default connect(mapStateToProps)(Home)
// export default Home;