import React, { Component } from 'react'

import BookCT from './BookCT'

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }

    this.getBooks = this.getBooks.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }
  
  componentDidMount(){
    this.getBooks();
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

  createBook () {

  }

  onEdit (item) {
    console.log('onedit',item)
  }

  onDelete (item) {
    console.log('ondelete',item)
    var payload = {
      bookID : item._id
    };
    
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );
    
    fetch("http://localhost:8000/books/delete",
    {
        method: "POST",
        body: data
    })
    .then(function(res) {
      console.log(res)
    })
    .then(function(data) {
      console.log(JSON.stringify(data))
    })
  }
  
  render() {
    let x = this
    let s = x.state
    return (
      <div className="container">
        <h3>
          Admin Dashboard
        </h3>
        <div className='row'>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Is Deleted</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                s.books.map((book, index) => (
                  <BookCT 
                    key = {index}
                    book = {book} 
                    onEdit = {() => x.onEdit(book)}
                    onDelete = {() => x.onDelete(book)}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}