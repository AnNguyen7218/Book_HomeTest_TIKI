import React, { Component } from 'react'

import BookCT from './BookCT'

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      title: '',
      author:''
    }

    this.getBooks = this.getBooks.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  
  componentDidMount(){
    this.getBooks();
  }

  handleInputChange(e){
    console.log(e.target.name,e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
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
    let x = this
    let book = {
      title: x.state.title,
      author: x.state.author
    }
    
    fetch("http://localhost:8000/books/new",
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book
      })
    })
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      if(data.success) {
        this.setState({
          title: '',
          author: ''
        });
        window.location.reload()
      }
    })
  }

  onEdit (item) {
    
  }

  onDelete (item) {
    let x = this
    
    fetch("http://localhost:8000/books/delete",
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookID : item._id
      })
    })
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      if(data.success) {
        window.location.reload()
      }
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

          <div className="add-ct">
            <h6>Add New Book</h6>
            <form>
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" name='title' id="title"
                        aria-describedby="title" placeholder="Enter title" required 
                        onChange ={this.handleInputChange}/>
              </div>
              <div class="form-group">
                <label for="author">Author</label>
                <input type="text" class="form-control" name='author' id="author" placeholder="Enter Author" 
                        required onChange ={this.handleInputChange}/>
              </div>
              <button onClick = {() => this.createBook()} class="btn btn-primary">Add New</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}