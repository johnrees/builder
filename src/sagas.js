import { takeLatest, takeEvery, delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import request from './utils/request'

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
    watchGetTotals()
  ]
}
