import * as React from 'react';
import ReactDOM from 'react-dom';
import { Action, createStore, StoreEnhancerStoreCreator, Reducer, applyMiddleware, DeepPartial, MiddlewareAPI, Dispatch } from 'redux';
import ReduxThunk, { ThunkDispatch } from 'redux-thunk';


// let's remove most of the application to keep only the SET_COLOR action and let's focus on one of the createStore parameters: enhancer

// == redux boilerplate
enum ActionType {
  SET_COLOR = 'SET_COLOR',
}
type SetColorAction = Action<ActionType.SET_COLOR> & {
  color: string;
};

type Actions = SetColorAction;

interface AppState {
  currentColor: string;
}

const reduce = (oldState: AppState = { currentColor: 'transparent' }, action: Actions): AppState => {
  if (action.type === ActionType.SET_COLOR) {
    return { 
      ...oldState,
      currentColor: action.color,
    };
  }
  return oldState;
};

// == store initialization
const myStore1 = createStore(reduce);
console.log(Object.keys(myStore1));


// an *enhancer* is a function that, given a createStore function, returns a different createStore function
// as an example, here is a useless enhancer that takes the original createStore and applies it without enhancing anything:
const idempotentEnhancer = (createStore: StoreEnhancerStoreCreator): StoreEnhancerStoreCreator => {
  return <S, A extends Action>(reducer: Reducer<S, A>, preloadedState?: DeepPartial<S>) => {
    return createStore(reducer, preloadedState);
  }
};

// /!\ you will have a type error here with redux 4.0.0
// at the time of writing, the StoreCreator type definition is not complete; the problem is corrected (https://github.com/reduxjs/redux/pull/2985) but the fix has not been released yet
const myStore2 = createStore(reduce, idempotentEnhancer); 
console.log(Object.keys(myStore2));


// enhancers enable you to enrich the created store with any kind of custom behaviors
const enhancer1 = (createStore: StoreEnhancerStoreCreator): StoreEnhancerStoreCreator<{ somethingMore: string }> => {
  return <S, A extends Action>(reducer: Reducer<S, A>, preloadedState?: DeepPartial<S>) => {
    const store = createStore(reducer, preloadedState);
    return { ...store, somethingMore: 'Hello' };
  }
};
const myStore3 = createStore(reduce, enhancer1);
console.log(Object.keys(myStore3), myStore3.somethingMore);


// enhancers can be composed
const enhancer2 = <Ext, ExtState>(createStore: StoreEnhancerStoreCreator<Ext, ExtState>): StoreEnhancerStoreCreator<Ext & { somethingMore2: string }, ExtState> => {
  return <S, A extends Action>(reducer: Reducer<S, A>, preloadedState?: DeepPartial<S>) => {
    const store = createStore(reducer, preloadedState);
    // you may see a type error here; it's a bug in typescript: https://github.com/Microsoft/TypeScript/pull/13288
    return { ...store, somethingMore2: 'World' };
  }
};
const composedEnhancers = (createStore: StoreEnhancerStoreCreator<any, any>): StoreEnhancerStoreCreator<{ somethingMore: string, somethingMore2: string }> => {
  return enhancer2(enhancer1(createStore));
};
const myStore4 = createStore(reduce, composedEnhancers);
console.log(Object.keys(myStore4), myStore4.somethingMore, myStore4.somethingMore2);


// as you can see, using redux with typescript can be cumbersome; nobody will blame you for giving up and use "any" sometimes


// anyway, redux is shipped with an interesting enhancer called *applyMiddleware*
// this enhancer enables you to set *middlewares* for the store, i.e., functions that enhance the dispatch function
// applyMiddleware takes a set of middlewares and *chains* them similarly to our composedEnhancers example, with the last middleware receiving the original dispatch function:
// => applyMiddleware(A, B, C) produces an enhancer that will perform something like store.dispatch = A(B(C(store.dispatch)))

// middleware functions receives a { dispatch, getState } object) and returns a function that, given the dispatch produced by the next middleware in the chain, returns a new dispatch implementation 
// let's create some useless middlewares that simply log something
const myMiddleware1 = (_: MiddlewareAPI) => {
  return (nextDispatch: Dispatch<Actions>) => { // it takes the enhanced dispatch of the next middlewares in the chain
    return (action: Actions) => { // this is the enhanced dispatch function returned by this middleware
      console.log('middleware1');
      return nextDispatch(action);
    };
  };
};
const myMiddleware2 = (_: MiddlewareAPI) => {
  return (nextDispatch: Dispatch<Actions>) => {
    return (action: Actions) => {
      console.log('middleware2');
      return nextDispatch(action);
    };
  };
};
const myMiddleware3 = (_: MiddlewareAPI) => {
  return (nextDispatch: Dispatch<Actions>) => {
    return (action: Actions) => {
      console.log('middleware3');
      return nextDispatch(action);
    };
  };
};
const myStore5 = createStore(reduce, applyMiddleware(myMiddleware1, myMiddleware2, myMiddleware3));
myStore5.dispatch({
  type: ActionType.SET_COLOR,
  color: 'red',
});


// middlewares can be used for various purpose and a lot of different middlewares are provided by the community
// for example redux-logger is a middleware that logs every dispatched actions
// a simplified implementation could be:
const myLoggerMiddleware = ({ getState }: MiddlewareAPI) => {
  return (nextDispatch: Dispatch<Actions>) => {
    return (action: Actions) => {
      const prevState = getState();
      const returnValue = nextDispatch(action);
      const nextState = getState();
      console.log(`%c prev state`, `color: #9E9E9E`, prevState);
      console.log(`%c action`, `color: #03A9F4`, action);
      console.log(`%c next state`, `color: #4CAF50`, nextState);
      console.log('----------------------------');
      return returnValue;
    };
  };
};
const myStore6 = createStore(reduce, applyMiddleware(myLoggerMiddleware));
myStore6.dispatch({
  type: ActionType.SET_COLOR,
  color: 'red',
});


// another interesting middleware is redux-thunk: it enables you to dispatch functions (called thunks) like if they were actions
// (in the literature, a thunk is a function that wraps an expression to be further evaluated; it's a core concept for lazy evaluation)
// in our case, it can be useful for asynchronous funtions
const myStore7 = createStore<AppState, Actions, {dispatch: ThunkDispatch<AppState, undefined, Actions>}, {}>(reduce, applyMiddleware(ReduxThunk, myLoggerMiddleware));
myStore7.dispatch((dispatch: ThunkDispatch<AppState, undefined, Actions>) => {
  dispatch({
    type: ActionType.SET_COLOR,
    color: 'blue',
  });
  setTimeout(() => {
    dispatch({
      type: ActionType.SET_COLOR,
      color: 'red',
    });
  }, 5000)
});
// once again, type definitions for such functions are a pain; do not hesitate to skip them


// you can imagine doing a lot of things using middlewares: debounce actions, persist the state, dispatch a batch of actions, delay actions when offline, dispatch promises, collect analytics...
// most of those use cases are covered by the community: https://redux.js.org/introduction/ecosystem#middleware


export default class App extends React.Component {
  render() {
    return <div></div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
