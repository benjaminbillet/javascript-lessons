import * as React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import store, { AppState } from './store';
import { setRandomColor, resetColor, saveColor, loadColor, colorReducer, ColorActionType } from './color';

import Block from './Block';
import History from './History';
import { increaseBorder, decreaseBorder, resetBorder, borderReducer } from './border';
import { AnyAction, combineReducers, ReducersMapObject, Reducer } from './node_modules/redux';



// maybe you asked yourself something about the main reducer: "if there is hundreds of actions, how will I manage this big ugly switch?"
// this is a serious concern and redux provides a solution to split the main reducer into smaller reducers: reducer composition

// redux provides you a primitive called combineReducers for reducer composition: combineReducers enables you to split a state into substate
// for example, imagine that we want to manage the border of our colored box; our state could be splitted in two sub-state:
// state = {
//   color: { currentColor, savedColor } <= state related to color
//   border: { width } <= state related to border
// }
// we could create two reducer, colorReducer and borderReducer, for managing actions related to color and border respectively
// our main reducer could be written like this:
const mainReducer1 = (oldState: any = {}, action: AnyAction) => {
  return { // we return an object that is built from the results of the two sub-reducers
    color: colorReducer(oldState.color, action), // we give the 'color' substate to the color reducer
    border: borderReducer(oldState.border, action), // we give the 'border' substate to the border reducer
  };
}
console.log(mainReducer1(undefined, { type: ColorActionType.RESET_COLOR }));

// combineReducers provides you a way to built this function automatically, by simply giving a mapping of the sub-state key to the sub-reducer:
const mainReducer2 = combineReducers({
  color: colorReducer,
  border: borderReducer,
});
console.log(mainReducer2(undefined, { type: ColorActionType.RESET_COLOR }));

// of course, combineReducers returns a regular reducer, so you can apply combineReducers to create a full tree of substate:
const mainReducer3 = combineReducers({
  color: colorReducer,
  border: borderReducer,
  useless: combineReducers({
    color: colorReducer,
    border: borderReducer,
  }),
});
console.log(mainReducer3(undefined, { type: ColorActionType.RESET_COLOR }));
// in this useless but illustrative case, the state would look like this:
// state = {
//   color: { currentColor, savedColor }
//   border: { width }
//   useless: {
//     color: { currentColor, savedColor }
//     border: { width }
//   }
// }

// a simplified implementation of combineReducers is:
const pseudoCombineReducers = (reducers: ReducersMapObject) => {
  const keys = Object.keys(reducers);
  return (oldState: any = {}, action: AnyAction) => {
    const newState: any = {};
    // for each key, apply the reducer to oldState[key] and put the results into newState[key]
    keys.forEach((key) => {
      const reducer = reducers[key];
      newState[key] = reducer(oldState[key], action);
    });
    return newState;
  };
};

// sometimes, it can be useful to implement reducer composition functions that fit your needs
// for example, imagine that we still want to keep our colorReducer and borderReducer separated but have a state without sub-state
// state = {
//  currentColor,
//  savedColor,
//  width
// }
// for this use case, we can create a mergeReducers function, that takes an array of reducers:
const mergeReducers = (reducers: Reducer[]) => {
  // note that this merged reducer has no default value in order to guarantee that all sub-reducers will return their default values at initialization time
  return (oldState: any, action: AnyAction) => {
    const newState: any = {};
    // for each reducer, apply the reducer to oldState and merge the results into newState
    reducers.forEach((reducer) => {
      Object.assign(newState, reducer(oldState, action));
    });
    return newState;
  };
};
// of course, this mergeReducers could be mixed with combineReducers
const mainReducer4 = combineReducers({
  color: colorReducer,
  border: borderReducer,
  useless: mergeReducers([
    colorReducer,
    borderReducer,
  ]),
});
console.log(mainReducer4(undefined, { type: ColorActionType.RESET_COLOR }));



export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Block />
          <h3>Color</h3>
          <button onClick={setRandomColor}>Random</button>
          <button onClick={resetColor}>Clear</button>
          <button onClick={saveColor}>Save</button>
          <button onClick={loadColor}>Load</button>
          <h3>Border</h3>
          <button onClick={increaseBorder}>Increase</button>
          <button onClick={decreaseBorder}>Decrease</button>
          <button onClick={resetBorder}>Clear</button>
          <h3>History</h3>
          <History />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
