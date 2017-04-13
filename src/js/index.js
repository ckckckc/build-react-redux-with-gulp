import 'babel-polyfill';
import App from './app/App.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './app/reducers.js';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

const history = createHistory();

let middleware = applyMiddleware(promiseMiddleware(), thunkMiddleware, routerMiddleware(history), logger);
let store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
