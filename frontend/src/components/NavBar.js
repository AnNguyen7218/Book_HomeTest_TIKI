import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">Books</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin">Admin</a>
                </li>
              </ul>
            </div>
        </div>
      </nav>
      )
    }
  }
  export default Navbar;