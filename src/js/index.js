import 'babel-polyfill';
import App from './components/App.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

let middleware = applyMiddleware(thunkMiddleware, promiseMiddleware());
let store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
   <App />
  </Provider>,
  document.getElementById('root')
);
