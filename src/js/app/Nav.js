import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNav: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    let { isOpenNav } = this.state;
    this.setState({isOpenNav: !isOpenNav});
  }

  addActiveByPath(path) {
    const { pathname } = this.props.location;
    return pathname.split('/')[1] === path ? 'active' : '';
  }

  render() {
    const { isOpenNav } = this.state;
    const toggleUL = isOpenNav ? 'open' : '';
    return (
      <nav class="nav">
        <div class="menu-icon" onClick={this.toggleNav}>
          <i class="tl"></i>
          <i class="ml"></i>
          <i class="bl"></i>
        </div>
        <ul class={'nav-ul ' + toggleUL }>
          <li class="nav-li">
            <Link class={'nav-link ' + this.addActiveByPath('')} 
                  onClick={this.toggleNav}
                  to="/">
              Home
            </Link>
          </li>
          <li class="nav-li">
            <Link class={'nav-link ' + this.addActiveByPath('articles')} 
                  onClick={this.toggleNav}
                  to="/articles">
              Articles
            </Link>
          </li>
          <li class="nav-li right">
            <Link class={'nav-link ' + this.addActiveByPath('about')} 
                  onClick={this.toggleNav}
                  to="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default connect(store => store.router)(Nav);