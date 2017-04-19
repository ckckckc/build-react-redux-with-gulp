import 'babel-polyfill';
import App from './app/App.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './app/reducers.js';
import thunkMiddleware from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
// console.log(process.env.NODE_ENV)
// console.log(process.env.ENV_FILE)
const history = createHistory();

let middlewares = [
  promiseMiddleware(), 
  thunkMiddleware, 
  routerMiddleware(history)
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-logger').logger);
}

let store = createStore(
  rootReducer, 
  applyMiddleware(...middlewares)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
