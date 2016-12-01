import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import App from './components/App'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
let middlewares = [ applyMiddleware(sagaMiddleware)]
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push( window.__REDUX_DEVTOOLS_EXTENSION__() )
}
const store = createStore(reducer, compose(...middlewares))
sagaMiddleware.run(rootSaga)
if (window.__REDUX_DEVTOOLS_EXTENSION__) window.__REDUX_DEVTOOLS_EXTENSION__.updateStore(store)

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
