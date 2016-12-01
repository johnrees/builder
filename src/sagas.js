import { takeLatest, takeEvery, delay } from 'redux-saga'
import { put, call, fork } from 'redux-saga/effects'
import axios from 'axios'
import request from './utils/request'

import {frameBox} from './blueprint/index'

export function* makeFramesAsync(action) {
  yield delay(200)

  const id = window.location.hash.match(/\d+/)[0]
  const requestURL = `${process.env.REACT_APP_BEAVER_HOST}/basic/${action.payload.width}/${action.payload.height}`
  try {
    const response = yield call(
      request,
      requestURL)
    yield put({ type: 'SET_FRAME_DATA', payload: response })
    // yield call(console.log, response)
  } catch (err) {
  }
}

export function* watchMakeFrames() {
  yield takeLatest('MAKE_FRAMES_ASYNC', makeFramesAsync)
}



export function* getDataAsync(action) {

  const id = window.location.hash.match(/\d+/)[0]
  const requestURL = `${process.env.REACT_APP_API_HOST}/p/${id}.json`
  try {
    const response = yield call(
      request,
      requestURL)

    yield put({ type: 'SET_DATA', payload: response })
    yield put({ type: 'SET_FRAME_HEIGHT', payload: response.merged_state.building.height })
    yield put({ type: 'SET_FRAME_WIDTH', payload: response.merged_state.building.width })
    yield put({ type: 'SET_LENGTH', payload: response.merged_state.building.length })
    yield put({ type: 'SET_TOTAL', payload: response.merged_state.building.costings.total })

    // yield call(console.log, response)
  } catch (err) {
  }
}

export function* watchGetDataAsync() {
  yield takeLatest('GET_DATA_ASYNC', getDataAsync)
}



export function* getTotalsAsync(action) {
  yield delay(200)

  const id = window.location.hash.match(/\d+/)[0]
  const requestURL = `${process.env.REACT_APP_API_HOST}/p/${id}/costings.json`
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          costings: action.payload
        })
      })
    yield put({ type: 'SET_TOTAL', payload: response.total })
    // yield call(console.log, response)
  } catch (err) {
  }
}

export function* watchGetTotals() {
  yield takeLatest('GET_TOTALS_ASYNC', getTotalsAsync)
}

export default function* rootSaga() {
  yield [
    watchGetTotals(),
    watchMakeFrames(),
    watchGetDataAsync()
  ]
}
