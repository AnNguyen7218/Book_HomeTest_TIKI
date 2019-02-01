import React, { Component } from 'react'

var DefaultBook = {
  thumbnail: 'https://source.unsplash.com/random/200x300',
  title: 'Default Title',
  author: 'Default Author'
}

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book : props.book || DefaultBook
    }
  }
  
  render() {
    let x = this
    let s = x.props

    return (
      <tr>
        <td>{s.book.title}</td>
        <td>{s.book.author}</td>
        <td>{s.book.isDeleted?'Deleted':''}</td>
        <td>
          <a onClick = {x.props.onEdit} href='#edit'> Edit </a>
        </td>
        <td>
          <a onClick = {x.props.onDelete} href='javascript:;'> Delete </a>
        </td>
      </tr>
    );
  }
}

