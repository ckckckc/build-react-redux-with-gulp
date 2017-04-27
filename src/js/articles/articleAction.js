import http from './../lib/http.js';

export function fetchArticles() {
  const url = '/posts';
  return {
    type: 'FETCH_ARTICLES',
    payload: http.get(url)
  };
}

export function fetchArticle(articleId) {
  const url = `/posts/${articleId}`;
  return {
    type: 'FETCH_ARTICLE',
    payload: http.get(url)
  };
}