import React, { Component } from 'react'
import {connect} from 'react-redux';

import { getBooks, addBook, editBook, deleteBook } from '../actions'
import BookCT from './BookCT'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      title: '',
      author:'',
      editable : false,
      editedObj: {},
      edit_title:'',
      edit_author:'',
      edit_delete_state: false
    }

    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillReceiveProps(nextprops) {
    // console.log('next', nextprops)
  }

  componentDidMount() {
    this.props.getBooks();
  }

  handleInputChange(e){
    if (e.target.name === 'edit_delete_state') {
      this.setState({
        edit_delete_state: document.getElementById("edit_delete_state").checked
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  createBook () {
    let x = this
    let book = {
      title: x.state.title,
      author: x.state.author
    }
    
    this.props.addBook(book)

    this.setState({
      title: '',
      author: ''
    });
  }

  onEdit (item) {

    this.setState({
      editable: true,
      editedObj: item,
      edit_title: item.title,
      edit_author: item.author,
      edit_delete_state: item.isDeleted
    });

    setTimeout(() => {
      document.getElementById('edit_title').value = item.title
      document.getElementById('edit_author').value = item.author
      document.getElementById('edit_delete_state').checked = item.isDeleted
    }, 100);
  }

  submitEdit () {
    let x = this
    let item = x.state.editedObj
    let updatedBook = {
      title: x.state.edit_title,
      author: x.state.edit_author,
      isDeleted: x.state.edit_delete_state
    }

    this.props.editBook(item._id, updatedBook)

    this.setState({
      editable: false,
      editedObj: {}
    });

    window.location.reload();
  }

  onDelete (item) {
    this.props.deleteBook(item._id);
    //TODO: why does props not change
    window.location.reload();
  }
  
  render() {
    let x = this
    let p = x.props
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
                p.books.books.map((book, index) => (
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
        <div className='row'>
          <div className="add-ct col-md-4">
            <h6>Add New Book</h6>
            <form>
              <div className="form-group">
                <label >Title</label>
                <input type="text" className="form-control" name='title' id="title"
                        aria-describedby="title" placeholder="Enter title" required 
                        onChange ={x.handleInputChange}/>
              </div>
              <div className="form-group">
                <label >Author</label>
                <input type="text" className="form-control" name='author' id="author" placeholder="Enter Author" 
                        required onChange ={x.handleInputChange}/>
              </div>
              <button onClick = {() => x.createBook()} className="btn btn-primary">Add New</button>
            </form>
          </div>
          {(x.state.editable)
            ?
            <div className="add-ct col-md-8">
              <h6 id='edit'>Edit Book</h6>
              <form>
                <div className="form-group">
                  <label >Title</label>
                  <input type="text" className="form-control" name='edit_title' id="edit_title"
                          aria-describedby="title" placeholder="Enter title" required 
                          onChange ={x.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label >Author</label>
                  <input type="text" className="form-control" name='edit_author' id="edit_author" placeholder="Enter Author" 
                          required onChange ={x.handleInputChange}/>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name='edit_delete_state' id="edit_delete_state" onChange ={x.handleInputChange}/>
                  <label className="form-check-label" >Deleted</label>
                </div>
                <button onClick = {() => x.submitEdit()} className="btn btn-primary">Update</button>
              </form>
            </div>
            :''}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.booksReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBooks: () => dispatch(getBooks()),
    addBook: (book) => dispatch(addBook(book)),
    editBook: (id, book) => dispatch(editBook(id,book)),
    deleteBook: (id) => dispatch(deleteBook(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)