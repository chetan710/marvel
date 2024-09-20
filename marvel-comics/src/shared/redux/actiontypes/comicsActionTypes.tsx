import { LatestComicData } from "../../models/latest-comics";


export const FETCH_COMICS_REQUEST = 'FETCH_COMICS_REQUEST';
export const FETCH_COMICS_SUCCESS = 'FETCH_COMICS_SUCCESS';
export const FETCH_COMICS_FAILURE = 'FETCH_COMICS_FAILURE';


export interface FetchComicsRequestAction {
    type: typeof FETCH_COMICS_REQUEST;
  }
  
  export interface FetchComicsSuccessAction {
    type: typeof FETCH_COMICS_SUCCESS;
    payload: LatestComicData[];
  }
  
  export interface FetchComicsFailureAction {
    type: typeof FETCH_COMICS_FAILURE;
    payload: string;
  }
  
  export type ComicsActionTypes =
    | FetchComicsRequestAction
    | FetchComicsSuccessAction
    | FetchComicsFailureAction;
