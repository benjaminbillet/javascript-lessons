import * as React from 'react';
import ReactDOM from 'react-dom';

// you can (and are encouraged to) create your own components
import Block from './Block';

export default class App extends React.Component {
  render() {
    // your custom components can be used through JSX like any HTML-like element
    // it also means that they can receive properties (see Block.tsx)
    return (
      <div>
        <Block color="purple">Hello</Block>
        <Block color="#fd971f">World</Block>
        <Block color="#a6e22e">
          <Block color="#75715e" size={100} />
        </Block>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
