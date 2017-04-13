import { combineReducers } from 'redux';
import todoReducer from './../todo/todoReducer.js';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  router: routerReducer,
  todo  : todoReducer,
});

export default rootReducer;