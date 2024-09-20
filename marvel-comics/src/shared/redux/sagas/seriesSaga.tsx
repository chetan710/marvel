import { put, takeLatest, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { isError } from '../../utils/isError';
import {  LatestSeriesData } from '../../models/latest-comics';
import { FETCH_COMICS_REQUEST } from '../actiontypes/comicsActionTypes';
import { fetchSeriesFailure, fetchSeriesSuccess } from '../actions/seriesActions';

const apiUrl = import.meta.env.VITE_API_URL;

function* fetchSeriesSaga(): Generator {
    try {
        const response: AxiosResponse<LatestSeriesData[]> = yield call(axios.get, `${apiUrl}/api/latestSeries`);
        const series = response.data;
        yield put(fetchSeriesSuccess(series));
    } catch (error) {
        if (isError(error)) {
            yield put(fetchSeriesFailure(error.message));
        } else {
            yield put(fetchSeriesFailure('An unknown error occurred'));
        }
    }
}

function* seriesSaga() {
    yield takeLatest(FETCH_COMICS_REQUEST, fetchSeriesSaga);
}

export default seriesSaga;