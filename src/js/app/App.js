import React, { Component } from 'react';
import Nav from './Nav.js';
import Todo from './../todo/Todo.js';
import { Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <main class="main">
          <Route exact path="/" render={() => 
            <h1>Home</h1>
          } />
          <Route path="/todo" component={Todo} />
        </main>
      </div>
    );
  }
}
