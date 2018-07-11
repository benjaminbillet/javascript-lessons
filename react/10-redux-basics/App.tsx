import * as React from 'react';
import ReactDOM from 'react-dom';
import { Action, createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import Block from './Block';


// basic concepts of redux:
// - the *state* of the application is represented by a global object: it must be kept *immutable* (i.e., any state modification implies creating a new state object)
// - an *action* is a little piece of state that must be merged in some way with the current state. An action is defined by a type and a payload while the merging logic associated to each action type is defined in the main reducer
// - the *main reducer* is a function that, given the current state and an action, returns a new state modified according to the action
// - the *store* is the object that holds the current state and provides primitives for (i) reading the store (store.getState), (ii) dispatching actions (store.dispatch) and (iii) listening for state updates (store.subscribe)
// - when an action is dispatched, redux (i) applies the main reducer, (ii) replaces the old state with the state returned by the main reducer and (iii) triggers listeners


// let's create a simple app that displays a colored box with the following actions


// == type definitions for actions
enum ActionType {
  SET_COLOR = 'SET_COLOR', // set the color of the box
  RESET_COLOR = 'RESET_COLOR', // reset the color of the box to 'transparent'
  SAVE_COLOR = 'SAVE_COLOR', // save the current color
  LOAD_COLOR = 'LOAD_COLOR', // load the last saved color
}

type SetColorAction = Action<ActionType.SET_COLOR> & {
  color: string;
};
type ResetColorAction = Action<ActionType.RESET_COLOR>;
type SaveColorAction = Action<ActionType.SAVE_COLOR>;
type LoadColorAction = Action<ActionType.LOAD_COLOR>;

type Actions = SetColorAction | ResetColorAction | SaveColorAction | LoadColorAction;

// == type definition for application state
interface AppState {
  currentColor: string;
  savedColor: string;
}

// == main reducer
// the default value is important: redux will start itself with an internal initialization action and, at this point, oldState will be undefined;
// by setting a default value here, we force the reducer to return the default value instead of undefined
const reduce = (oldState: AppState = { currentColor: 'transparent', savedColor: 'transparent' }, action: Actions): AppState => {
  console.log('Reduce called', oldState, action);
  if (action.type === ActionType.SET_COLOR) {
    return { 
      ...oldState,
      currentColor: action.color,
    };
  } else if(action.type === ActionType.RESET_COLOR) {
    return { 
      ...oldState,
      currentColor: 'transparent',
    };
  } else if(action.type === ActionType.SAVE_COLOR) {
    return { 
      ...oldState,
      savedColor: oldState.currentColor,
    };
  } else if(action.type === ActionType.LOAD_COLOR) {
    return { 
      ...oldState,
      currentColor: oldState.savedColor,
    };
  }
  return oldState;
};

// == store initialization
const myStore = createStore(reduce);

// == some helpers for dispatching actions
// note that, in redux vocabulary:
// - an action creator is a function that creates an action object
// - a bound action creator is a function that creates an action object and dispatch it

const setColor = (color: string) => {
  myStore.dispatch({
    type: ActionType.SET_COLOR,
    color,
  });
};

const resetColor = () => {
  myStore.dispatch({ type: ActionType.RESET_COLOR });
};

const saveColor = () => {
  myStore.dispatch({ type: ActionType.SAVE_COLOR });
};

const loadColor = () => {
  myStore.dispatch({ type: ActionType.LOAD_COLOR });
};

const setRandomColor = () => {
  // we can reuse existing bound action creator to create new "actions" without having to manage a new action type/reducer logic
  setColor(`#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`);
};

// == add a listener
myStore.subscribe(() => {
  console.log('Listener', myStore.getState()); // we simply log the state
});


// == connecting a component to the store
// in practice, you will probably never use redux listeners: 
// thanks to react-redux you can *connect* react components to the store and be re-rendered automatically when the state is updated

// the connect primitive provided by react-redux is a function that returns an HOC, hence the "funny" call: connect(...)(Component)
// this HOC produces a new component that listens for state updates and re-renders accordingly
const ConnectedBlock = connect(
  (state: AppState) => { // state mapping function (see below)
    return {
      color: state.currentColor, // the wrapped component will receive state.currentColor as the 'color' props
    };
  },
)(Block);

// the state mapping function enable you to express which part of the state will trigger re-rerendering
// given the state, the mapping function returns a props object for the wrapped component

// without the mapping function, all components connected to the store would be re-rendered when any part of the state is updated; in a large application with a complex state, it could ruin performance
// under the hood, a connected component can be (roughly) summarized as: 
// - when the state is updated, the redux listener defined by the component is triggered
// - the component applies the mapping function and compare the returned results to the previous one
// - if the results have changed, the component pass them as props of the wrapped component

export default class App extends React.Component {
  render() {
    // Provider is a component of react-redux that defines a context to pass the store to all the connected components
    // Provider should be the root of the application (or, more specifically, no connected component should exists outside of Provider)
    return (
      <Provider store={myStore}>
        <div>
          <ConnectedBlock />
          <button onClick={setRandomColor}>Random</button>
          <button onClick={resetColor}>Clear</button>
          <button onClick={saveColor}>Save</button>
          <button onClick={loadColor}>Load</button>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
