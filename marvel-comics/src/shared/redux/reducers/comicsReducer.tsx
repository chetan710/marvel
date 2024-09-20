import { LatestComicState } from '../../models/latest-comics';
import { ComicsActionTypes, FETCH_COMICS_FAILURE, FETCH_COMICS_REQUEST, FETCH_COMICS_SUCCESS } from '../actiontypes/comicsActionTypes';


const initialState: LatestComicState = {
  loading: false,
  latestComics: [],
  comics: [],
  error: null,
};

const comicsReducer = (state = initialState, action: ComicsActionTypes): LatestComicState => {
  switch (action.type) {
    case FETCH_COMICS_REQUEST:
      return { ...state, loading: true };
    case FETCH_COMICS_SUCCESS:
      return { ...state, loading: false, ...action.payload, error: null };
    case FETCH_COMICS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default comicsReducer;
