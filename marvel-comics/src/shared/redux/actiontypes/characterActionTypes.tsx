import { RandomCharactersData } from "../../models/random-characters";

export const FETCH_CHARACTERS_REQUEST = 'FETCH_CHARACTERS_REQUEST';
export const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
export const FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE';


export interface FetchCharactersRequestAction {
    type: typeof FETCH_CHARACTERS_REQUEST;
  }
  
  export interface FetchCharactersSuccessAction {
    type: typeof FETCH_CHARACTERS_SUCCESS;
    payload: RandomCharactersData[];
  }
  
  export interface FetchCharactersFailureAction {
    type: typeof FETCH_CHARACTERS_FAILURE;
    payload: string;
  }
  
  export type CharacterActionTypes =
    | FetchCharactersRequestAction
    | FetchCharactersSuccessAction
    | FetchCharactersFailureAction;
