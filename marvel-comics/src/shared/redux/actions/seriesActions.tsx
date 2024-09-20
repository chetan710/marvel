import { LatestSeriesData } from "../../models/latest-comics";
import { FETCH_SERIES_FAILURE, FETCH_SERIES_REQUEST, FETCH_SERIES_SUCCESS } from "../actiontypes/seriesActionTypes";


export const fetchSeriesRequest = () => ({
  type: FETCH_SERIES_REQUEST,
});

export const fetchSeriesSuccess = (series: LatestSeriesData[]) => ({
  type: FETCH_SERIES_SUCCESS,
  payload: series,
});

export const fetchSeriesFailure = (error: string) => ({
  type: FETCH_SERIES_FAILURE,
  payload: error,
});
