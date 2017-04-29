import articleReducer from './articles/articleReducer.js';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  router : routerReducer,
  article: articleReducer,
});

export default rootReducer;