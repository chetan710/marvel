import { RandomCharatersState } from '../../models/random-characters';
import { CharacterActionTypes, FETCH_CHARACTERS_FAILURE, FETCH_CHARACTERS_REQUEST, FETCH_CHARACTERS_SUCCESS } from '../actiontypes/characterActionTypes';


const initialState: RandomCharatersState = {
  loading: false,
  characters: [],
  error: null,
};

const characterReducer = (state = initialState, action: CharacterActionTypes): RandomCharatersState => {
  switch (action.type) {
    case FETCH_CHARACTERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CHARACTERS_SUCCESS:
      return { ...state, loading: false, characters: action.payload, error: null };
    case FETCH_CHARACTERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default characterReducer;
