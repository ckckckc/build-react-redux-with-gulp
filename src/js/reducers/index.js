import { combineReducers } from 'redux';
import todoReducer from './todoReducer.js';

const rootReducer = combineReducers({
  todo: todoReducer
});

export default rootReducer;