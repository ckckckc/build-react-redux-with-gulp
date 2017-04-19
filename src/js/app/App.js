import Articles from './../articles/Articles.js';
import Article from './../articles/Article.js';
import React, { Component } from 'react'; 
import Nav from './Nav.js';
import Todo from './../todo/Todo.js';
import Home from './Home.js';
import { Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <main class="main">
          <Route exact path="/" component={Home} />
          <Route exact path="/articles" component={Articles} />
          <Route path="/articles/:articleId" component={Article} />

          <Route path="/todo" component={Todo} />
        </main>
      </div>
    );
  }
}
