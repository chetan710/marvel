import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectCharactersState = (state: RootState) => state.characters;

export const selectCharacters = createSelector(
  [selectCharactersState],
  (charactersState) => charactersState.characters
);
