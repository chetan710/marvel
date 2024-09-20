import { all } from 'redux-saga/effects';
import characterSaga from './characterSaga';
import comicsSaga from './comicsSaga';
import seriesSaga from './seriesSaga';

function* rootSaga() {
  yield all([
    characterSaga(),
    comicsSaga(),
    seriesSaga(),
  ]);
}

export default rootSaga;
