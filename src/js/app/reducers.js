import { combineReducers } from 'redux';
import todoReducer from './../todo/todoReducer.js';

const rootReducer = combineReducers({
  todo: todoReducer
});

export default rootReducer;