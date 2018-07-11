import { createStore, combineReducers } from 'redux';
import { ColorState, colorReducer } from './color';
import { BorderState, borderReducer } from './border';
import { HistoryState, historyReducer } from './colorHistory';

export interface AppState {
  color: ColorState;
  colorHistory: HistoryState;
  border: BorderState;
}

const reducer = combineReducers({
  color: colorReducer,
  colorHistory: historyReducer,
  border: borderReducer,
})

export default createStore(reducer);

