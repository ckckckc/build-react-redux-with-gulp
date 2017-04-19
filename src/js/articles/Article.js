import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticle } from './articleAction.js';
import config from '$config';

class Article extends Component{
  componentWillMount() {
    const { articleId } = this.props.match.params;
    this.props.fetchArticle(articleId);
  }

  render() {
    const { article, fetchingArticle } = this.props;

    if (fetchingArticle) return (
      <article class="article">
        <h2 class="article-title">
          <img src={config.svg.loading} alt="Loading..."/>
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