import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import App from './components/App'
import thunk from 'redux-thunk'
// import SVGFile from './components/SVGFile'
// import Canvas from './blueprint/canvas'

import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

let middlewares = [ applyMiddleware(sagaMiddleware), applyMiddleware(thunk)]
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push( window.__REDUX_DEVTOOLS_EXTENSION__() )
}

const store = createStore(reducer, compose(...middlewares))

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, composeEnhancers(
//   applyMiddleware(sagaMiddleware),
//   applyMiddleware(thunk)
// ));

sagaMiddleware.run(rootSaga)

if (window.__REDUX_DEVTOOLS_EXTENSION__) window.__REDUX_DEVTOOLS_EXTENSION__.updateStore(store)

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)

// ReactDOM.render(
//   <Canvas />,
//   document.getElementById('root')
// )
