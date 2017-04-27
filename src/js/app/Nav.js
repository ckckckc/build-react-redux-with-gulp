import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import { Link } from 'react-router-dom';

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNav: false
    };
    this.closeNav = this.closeNav.bind(this);
    this.openNav = this.openNav.bind(this);
  }

  openNav() {
    this.setState({isOpenNav: true});
  }

  closeNav() {
    this.setState({isOpenNav: false});
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
        <div class="menu-icon" onClick={this.openNav}>
          <i class="tl"></i>
          <i class="ml"></i>
          <i class="bl"></i>
        </div>
        <ul class={'nav-ul ' + toggleUL }>
          <li class="nav-li">
            <Link class={'nav-link ' + this.addActiveByPath('')} 
                  onClick={this.closeNav}
                  to="/">
              Home
            </Link>
          </li>
          <li class="nav-li">
            <Link class={'nav-link ' + this.addActiveByPath('articles')} 
                  onClick={this.closeNav}
                  to="/articles">
              Articles
            </Link>
          </li>
          <li class="nav-li right">
            <Link class={'nav-link ' + this.addActiveByPath('about')} 
                  onClick={this.closeNav}
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