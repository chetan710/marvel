import { RandomCharactersData } from '../../models/random-characters';
import { FETCH_CHARACTERS_FAILURE, FETCH_CHARACTERS_REQUEST, FETCH_CHARACTERS_SUCCESS } from '../actiontypes/characterActionTypes';

export const fetchCharactersRequest = () => ({
  type: FETCH_CHARACTERS_REQUEST,
});

export const fetchCharactersSuccess = (characters: RandomCharactersData[]) => ({
  type: FETCH_CHARACTERS_SUCCESS,
  payload: characters,
});

export const fetchCharactersFailure = (error: string) => ({
  type: FETCH_CHARACTERS_FAILURE,
  payload: error,
});
