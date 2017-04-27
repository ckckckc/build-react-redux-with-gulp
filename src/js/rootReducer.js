import articleReducer from './articles/articleReducer.js';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  router : routerReducer,
  Article: articleReducer,
});

export default rootReducer;