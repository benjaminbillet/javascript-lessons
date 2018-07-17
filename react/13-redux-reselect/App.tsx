import * as React from 'react';
import ReactDOM from 'react-dom';
import { Action, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import Color from 'color';
import { createSelector } from 'reselect';

import Block from './Block';


// there is a lot of nice libraries in the redux ecosystem (https://redux.js.org/introduction/ecosystem) but reselect is a very useful one:
// - selectors are functions that can compute data derived from the state (enabling you to minimize your state)
// - selectors provide memoization: once the derived data is computed, they are not recomputed until the state is updated
// - selectors are composable functions



// == redux boilerplate
enum ActionType {
  SET_COLOR = 'SET_COLOR',
  SET_BORDER = 'SET_BORDER',
}
type SetColorAction = Action<ActionType.SET_COLOR> & {
  color: string;
};
type SetBorderAction = Action<ActionType.SET_BORDER> & {
  color: string;
};


type Actions = SetColorAction | SetBorderAction;

interface AppState {
  boxColor: string;
  borderColor: string;
}

const reduce = (oldState: AppState = { boxColor: 'transparent', borderColor: 'transparent' }, action: Actions): AppState => {
  if (action.type === ActionType.SET_COLOR) {
    return { 
      ...oldState,
      boxColor: action.color,
    };
  } else if (action.type === ActionType.SET_BORDER) {
    return { 
      ...oldState,
      borderColor: action.color,
    };
  }
  return oldState;
};

const myStore = createStore(reduce);

const setColor = (color: string) => {
  myStore.dispatch({
    type: ActionType.SET_COLOR,
    color,
  });
};
const setRandomColor = () => {
  setColor(`#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`);
};

const setBorderColor = (color: string) => {
  myStore.dispatch({
    type: ActionType.SET_BORDER,
    color,
  });
};
const setRandomBorderColor = () => {
  setBorderColor(`#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`);
};


// a simple selector, that does not involve reselect
const getBoxColor = (state: AppState) => state.boxColor;

export const getDarkerColor = createSelector(
  [ getBoxColor ], // represents the inputs of the selector; each input can be a value or a function
  (boxColor) => { // input values or input call results (for function inputs) are passed to the selector
    console.log('darken');
    if (boxColor === 'transparent') {
      return 'transparent';
    }
    return Color(boxColor).darken(0.5).hex();
  }
);
export const getLighterColor = (state: AppState) => {
  console.log('lighten');
  if (state.boxColor === 'transparent') {
    return 'transparent';
  }
  return Color(state.boxColor).lighten(0.5).hex();
};

const ConnectedBlock = connect(
  (state: AppState) => {
    return {
      color: state.boxColor,
      dark: getDarkerColor(state), // memoized, will not be recomputed if state.boxColor doesn't change
      light: getLighterColor(state), // non-memoized, will be recomputed every time the state change
      border: state.borderColor,
    };
  },
)(Block);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={myStore}>
        <div>
          <ConnectedBlock />
          <button onClick={setRandomColor}>Random Color</button>
          <button onClick={setRandomBorderColor}>Random Border Color</button>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
