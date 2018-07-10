import * as React from 'react';
import ReactDOM from 'react-dom';
import Block from './Block';

// the context api helps you to share a property for a tree of react components (e.g., the current language)
// look at Context.tsx to see how the context is created
import { SomeContext } from './Context';

// SomeContext contains two components:
// - a Provider, that can be used to set the shared property
// - a Consumer, that can be used to read the shared property


export default class App extends React.Component {
  render() {
    return (
      <div>
        <SomeContext.Provider value="A value">
          <Block color="#a6e22e" />
        </SomeContext.Provider>

        <SomeContext.Provider value="Another value">
          <Block color="#fd971f" />
        </SomeContext.Provider>

        <Block color="#f92672" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
