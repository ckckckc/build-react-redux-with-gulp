import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticle } from './articleAction.js';

import { Button, Modal } from 'react-bootstrap';

class Article extends Component{
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  componentWillMount() {
    const { articleId } = this.props.match.params;
    this.props.fetchArticle(articleId);
  }

  closeModal() {
    this.setState({
      'showModal': false
    });
  }

  openModal() {
    this.setState({
      'showModal': true
    });
  }

  render() {
    const { article, fetchingArticle } = this.props;

    if (fetchingArticle) return (
      <article class="article">
        <h2 class="article-title">
          <img src='/images/svg/loading.svg' alt="Loading..."/>
        </h2>
      </article>
    );
    return (
      <article class="article">
        <h2 class="article-title">
          {article.title}
        </h2>
        <p class="article-body">
          {article.body}
        </p>


        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.openModal}
        >
          Launch demo modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </article>
    );
  }
}

export default connect((store) => {
  const { article, fetchingArticle } = store.Article;
  return { article, fetchingArticle };
}, dispatch => {
  return {
    fetchArticle: (articleId) => {
      dispatch(fetchArticle(articleId));
    }
  };
})(Article);