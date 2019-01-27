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
    let s = this.state
    return (
      <article className='col-lg-4 col-12'>
        <div className='img-ct'>
          <img src={s.book.thumbnail} alt='book_thumbnail'/>
        </div>
        <div className='des-ct'>
          <div className='title'>{s.book.title}</div>
          <div className='author'>{s.book.author}</div>
        </div>
      </article>
    );
  }
}

