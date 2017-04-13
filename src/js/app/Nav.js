import React, { Component } from 'react';

export default class Nav extends Component {
  
  render() {
    return (
      <nav class="nav">
        <ul class="nav-ul">
          <li class="nav-li"><a class="nav-link" href="#">Home</a></li>
          <li class="nav-li"><a class="nav-link" href="#">Articles</a></li>
          <li class="nav-li right"><a class="nav-link" href="#">About</a></li>
        </ul>
      </nav>
    );
  }
}
