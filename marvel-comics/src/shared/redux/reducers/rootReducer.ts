// redux/rootReducer.ts
import { combineReducers } from 'redux';
import characterReducer from './characterReducer';
import comicsReducer from './comicsReducer';
import seriesReducer from './seriesReducers';

const rootReducer = combineReducers({
  characters: characterReducer, 
  comics: comicsReducer,
  series: seriesReducer,
});

export default rootReducer;
