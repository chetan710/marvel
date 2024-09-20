import { LatestSeriesState } from "../../models/latest-comics";
import { FETCH_SERIES_FAILURE, FETCH_SERIES_REQUEST, FETCH_SERIES_SUCCESS, SeriesActionTypes } from "../actiontypes/seriesActionTypes";

const initialState: LatestSeriesState = {
  loading: false,
  series: [],
  error: null,
};

const seriesReducer = (state = initialState, action: SeriesActionTypes): LatestSeriesState => {
  switch (action.type) {
    case FETCH_SERIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_SERIES_SUCCESS:
      return { ...state, loading: false, series: action.payload, error: null };
    case FETCH_SERIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default seriesReducer;
