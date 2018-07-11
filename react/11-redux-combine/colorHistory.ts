import { ColorActionType, ColorAction } from './color';

// == type definition for color history
export type HistoryState = string[];

// == reducer for color history
// this reducer will capture color actions (set and reset colors) and update its own state
export const historyReducer = (oldState: HistoryState = [], action: ColorAction): HistoryState => {
  if (action.type === ColorActionType.SET_COLOR) {
    return [
      ...oldState,
      action.color,
    ];
  } else if(action.type === ColorActionType.RESET_COLOR) {
    return [];
  }
  return oldState;
};
