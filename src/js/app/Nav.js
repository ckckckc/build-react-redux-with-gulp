import React from 'react';
import { connect } from 'react-redux' ;
import { Link } from 'react-router-dom';

const Nav = ({ location }) => {
  function addActiveByPath(path) {
    const { pathname } = location;
    return pathname === path ? 'active' : '';
  }

  return (
    <nav class="nav">
      <ul class="nav-ul">
        <li class="nav-li">
          <Link class={'nav-link ' + addActiveByPath('/')} to="/">
            Home
          </Link>
        </li>
        <li class="nav-li">
          <Link class={'nav-link ' + addActiveByPath('/articles')} to="/articles">
            Articles
          </Link>
        </li>
        <li class="nav-li right">
          <Link class={'nav-link ' + addActiveByPath('/about')} to="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};


export default connect(store => store.router)(Nav);