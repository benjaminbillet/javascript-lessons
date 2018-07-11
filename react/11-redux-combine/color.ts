import { Action } from 'redux';
import store from './store';


// == type definitions for color actions
export enum ColorActionType {
  SET_COLOR = 'SET_COLOR', // set the color of the box
  RESET_COLOR = 'RESET_COLOR', // reset the color of the box to 'transparent'
  SAVE_COLOR = 'SAVE_COLOR', // save the current color
  LOAD_COLOR = 'LOAD_COLOR', // load the last saved color
}

export type SetColorAction = Action<ColorActionType.SET_COLOR> & {
  color: string;
};
export type ResetColorAction = Action<ColorActionType.RESET_COLOR>;
export type SaveColorAction = Action<ColorActionType.SAVE_COLOR>;
export type LoadColorAction = Action<ColorActionType.LOAD_COLOR>;

export type ColorAction = SetColorAction | ResetColorAction | SaveColorAction | LoadColorAction;

// == type definition for color state
export interface ColorState {
  currentColor: string;
  savedColor: string;
}

// == reducer for color actions
export const colorReducer = (oldState: ColorState = { currentColor: 'transparent', savedColor: 'transparent' }, action: ColorAction): ColorState => {
  if (action.type === ColorActionType.SET_COLOR) {
    return { 
      ...oldState,
      currentColor: action.color,
    };
  } else if(action.type === ColorActionType.RESET_COLOR) {
    return { 
      ...oldState,
      currentColor: 'transparent',
    };
  } else if(action.type === ColorActionType.SAVE_COLOR) {
    return { 
      ...oldState,
      savedColor: oldState.currentColor,
    };
  } else if(action.type === ColorActionType.LOAD_COLOR) {
    return { 
      ...oldState,
      currentColor: oldState.savedColor,
    };
  }
  return oldState;
};

export const setColor = (color: string) => {
  store.dispatch({
    type: ColorActionType.SET_COLOR,
    color,
  });
};

export const resetColor = () => {
  store.dispatch({ type: ColorActionType.RESET_COLOR });
};

export const saveColor = () => {
  store.dispatch({ type: ColorActionType.SAVE_COLOR });
};
export const loadColor = () => {
  store.dispatch({ type: ColorActionType.LOAD_COLOR });
};
export const setRandomColor = () => {
  setColor(`#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`);
};