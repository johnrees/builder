import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import App from './components/App'
import thunk from 'redux-thunk'
import SVGFile from './components/SVGFile'
import Canvas from './blueprint/canvas'

const store = createStore(
  reducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)


// ReactDOM.render(
//   <App store={store} />,
//   document.getElementById('root')
// )

ReactDOM.render(
  <Canvas />,
  document.getElementById('root')
)
