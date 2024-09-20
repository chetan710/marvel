import { LatestSeriesData } from "../../models/latest-comics";

export const FETCH_SERIES_REQUEST = 'FETCH_SERIES_REQUEST';
export const FETCH_SERIES_SUCCESS = 'FETCH_SERIES_SUCCESS';
export const FETCH_SERIES_FAILURE = 'FETCH_SERIES_FAILURE';


export interface FetchSeriesRequestAction {
    type: typeof FETCH_SERIES_REQUEST;
  }
  
  export interface FetchSeriesSuccessAction {
    type: typeof FETCH_SERIES_SUCCESS;
    payload: LatestSeriesData[];
  }
  
  export interface FetchSeriesFailureAction {
    type: typeof FETCH_SERIES_FAILURE;
    payload: string;
  }
  
  export type SeriesActionTypes =
    | FetchSeriesRequestAction
    | FetchSeriesSuccessAction
    | FetchSeriesFailureAction;
