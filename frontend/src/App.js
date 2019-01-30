import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

import NavBar from './components/NavBar'
import Home from './components/Home'
import Admin from './components/Admin'

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
         <Router>
            <div>
              <NavBar />
              <Route exact path="/" component={ Home } />
              <Route path="/admin" component={ Admin } />
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
