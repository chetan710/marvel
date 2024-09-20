import { put, takeLatest, call } from 'redux-saga/effects';
import { fetchCharactersSuccess, fetchCharactersFailure } from '../actions/characterActions';
import axios, { AxiosResponse } from 'axios';
import { FETCH_CHARACTERS_REQUEST } from '../actiontypes/characterActionTypes';
import { RandomCharactersData } from '../../models/random-characters';
import { isError } from '../../utils/isError';

const apiUrl = import.meta.env.VITE_API_URL;

function* fetchCharactersSaga(): Generator {
    try {
        const response: AxiosResponse<RandomCharactersData[]> = yield call(axios.get, `${apiUrl}/api/randomCharacters`);
        const characters = response.data;
        yield put(fetchCharactersSuccess(characters));
    } catch (error) {
        if (isError(error)) {
            yield put(fetchCharactersFailure(error.message));
        } else {
            yield put(fetchCharactersFailure('An unknown error occurred'));
        }
    }
}

function* characterSaga() {
    yield takeLatest(FETCH_CHARACTERS_REQUEST, fetchCharactersSaga);
}

export default characterSaga;