import { Action } from 'redux';
import store from './store';


// == type definitions for actions
export enum BorderActionType {
  INCREASE_BORDER = 'INCREASE_BORDER', // increase the border of the box
  DECREASE_BORDER = 'DECREASE_BORDER', // decrease the border of the box
  RESET_BORDER = 'RESET_BORDER', // remove the border of the box
}

export type IncreaseBorderAction = Action<BorderActionType.INCREASE_BORDER>;
export type DecreaseBorderAction = Action<BorderActionType.DECREASE_BORDER>;
export type ResetBorderAction = Action<BorderActionType.RESET_BORDER>;

export type BorderAction = IncreaseBorderAction | DecreaseBorderAction | ResetBorderAction;

// == type definition for state
export interface BorderState {
  width: number;
}

// == reducer for border actions
export const borderReducer = (oldState: BorderState = { width: 0 }, action: BorderAction): BorderState => {
  if (action.type === BorderActionType.INCREASE_BORDER) {
    return {
      width: oldState.width + 1,
    };
  } else if(action.type === BorderActionType.DECREASE_BORDER) {
    return {
      width: Math.max(0, oldState.width - 1),
    };
  } else if(action.type === BorderActionType.RESET_BORDER) {
    return { 
      width: 0,
    };
  }
  return oldState;
};

export const increaseBorder = () => {
  store.dispatch({ type: BorderActionType.INCREASE_BORDER });
};

export const decreaseBorder = () => {
  store.dispatch({ type: BorderActionType.DECREASE_BORDER });
};

export const resetBorder = () => {
  store.dispatch({ type: BorderActionType.RESET_BORDER });
};
