import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { isError } from '../../utils/isError';
import { fetchComicsFailure, fetchComicsSuccess } from '../actions/comicsActions';
import { FETCH_COMICS_REQUEST } from '../actiontypes/comicsActionTypes';

const apiUrl = import.meta.env.VITE_API_URL;

function* fetchComicsSaga(): Generator {
    try {
        const latestedComics = yield call(axios.get, `${apiUrl}/api/latestComics`);
        const getComics = yield call(axios.get, `${apiUrl}/api/getComics`);
        const latestcomics = latestedComics.data;
        const comics = getComics.data;
        yield put(fetchComicsSuccess(latestcomics, comics));
    } catch (error) {
        if (isError(error)) {
            yield put(fetchComicsFailure(error.message));
        } else {
            yield put(fetchComicsFailure('An unknown error occurred'));
        }
    }
}

function* comicsSaga() {
    yield takeLatest(FETCH_COMICS_REQUEST, fetchComicsSaga);
}

export default comicsSaga;