import React, { Component } from 'react';
import Nav from './Nav.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />

        <main>
          <h1>Hello, world!</h1>
          <button className="btn btn-primary">primary btn</button>
        </main>
      </div>
    );
  }
}
