import { LatestComicData } from "../../models/latest-comics";
import { FETCH_COMICS_FAILURE, FETCH_COMICS_REQUEST, FETCH_COMICS_SUCCESS } from "../actiontypes/comicsActionTypes";

export const fetchComicsRequest = () => ({
  type: FETCH_COMICS_REQUEST,
});

export const fetchComicsSuccess = (latestComics: LatestComicData[], comics: LatestComicData[]) => ({
  type: FETCH_COMICS_SUCCESS,
  payload: { latestComics, comics },
});

export const fetchComicsFailure = (error: string) => ({
  type: FETCH_COMICS_FAILURE,
  payload: error,
});
