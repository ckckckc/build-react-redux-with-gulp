const defaultState = {
  articles: [],
  article: {},
  fetchingArticles: false,
  fetchingArticle: false,
};

export default (state = defaultState, action) => {

  switch (action.type) {
    case 'FETCH_ARTICLES_PENDING': {
      return {...state, fetchingArticles: true};
    }
    case 'FETCH_ARTICLES_FULFILLED': {
      const articles = action.payload.data;
      return {...state, articles, fetchingArticles: false};
    }
    case 'FETCH_ARTICLE_PENDING': {
      return {...state, fetchingArticle: true};
    }
    case 'FETCH_ARTICLE_FULFILLED': {
      const article = action.payload.data;
      return {...state, article, fetchingArticle: false};
    }
  }
  return {...state};
};