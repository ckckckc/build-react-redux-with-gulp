import React, { Component } from 'react';
import { fetchArticles } from './articleAction.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Articles extends Component {
  componentWillMount() {
    this.props.fetchArticles();
  }

  render() {
    const { articles, fetchingArticles } = this.props;
    if (fetchingArticles) return (
      <article class="article">
        <h2 class="article-title">
          <img src='/images/svg/loading.svg' alt="Loading..."/>
        </h2>
      </article>
    );
    return (
      <div>
        { articles && articles.map(article => {
            let body = article.body.length >= 200
                        ? article.body.substring(0, 197) + '...'
                        : article.body;

            return (
              <article class="article" key={article.id}>
                <h2 class="article-title">
                  <Link to={`/articles/${article.id}`}>{article.title}</Link>
                </h2>
                <p class="article-body">
                  {body}
                </p>
              </article>
            );
          })
        }
      </div>
    );
  }
}

export default connect(store => {
  const { articles, fetchingArticles } = store.article;
  return { articles, fetchingArticles };
}, dispatch => {
  return {
    fetchArticles: () => {
      dispatch(fetchArticles());
    }
  };
})(Articles);