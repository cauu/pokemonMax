import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

import configureStore from './js/store/configureStore'
import createRoutes from './js/route'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import _ from 'lodash'

import './css/app.scss';

let reduxState = {}
if (window.__REDUX_STATE__) {
  try {
    let plain = JSON.parse(unescape(__REDUX_STATE__))
    _.each(plain, (val, key)=> {
      reduxState[key] = Immutable.fromJS(val)
    })
  } catch (e) {
  }
}

const store = configureStore(reduxState)

ReactDOM.render((
  <Provider store={store}>
    { createRoutes(browserHistory) }
  </Provider>
), document.getElementById('root'))
