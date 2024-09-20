import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectComicsState = (state: RootState) => state.comics;

export const selectLatestComics = createSelector(
  [selectComicsState],
  (latestComicsState) => latestComicsState.latestComics
);

export const selectComics = createSelector(
  [selectComicsState],
  (comicState) => comicState.comics
);

