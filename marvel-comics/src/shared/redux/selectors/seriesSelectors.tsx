import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectSeriesState = (state: RootState) => state.series;

export const selectSeries = createSelector(
  [selectSeriesState],
  (seriesState) => seriesState.series
);