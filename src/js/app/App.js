import React, { Component } from 'react';
import Nav from './Nav.js';
import Todo from './../todo/Todo.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />

        <main>
          <h1>hello, world!</h1>
          <Todo />
        </main>
      </div>
    );
  }
}
