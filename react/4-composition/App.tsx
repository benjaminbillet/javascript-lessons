import * as React from 'react';
import ReactDOM from 'react-dom';
import Block from './Block';

export default class App extends React.Component {
  render() {
    // you can store JSX elements into variables for later use
    let element1 = <strong>This is a block</strong>;

    // you can pass it to a function
    element1 = this.wrapInBlock(element1);

    // you can build array of JSX elements, but you must ensure that each top element has a unique 'key' property or you will get a warning at runtime
    // react uses these keys internally to optimize access to elements, thus you should provide stable keys (i.e., identify the components consistently over time)
    const elements = [];
    for (let i = 0; i < 10; i++) {
      // here, the key will be based on the array index
      elements.push(this.wrapInBlock(undefined, `item${i}`));
    }
    
    // your variables can be used as children directly
    // they can be used more than one time
    return (
      <div>
        {element1}
        {element1}
        {element1}
        {elements}
      </div>
    );
  }

  wrapInBlock(item?: React.ReactNode, key?: string) {
    const randomColor = `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`;
    // note: null/undefined children or keys are simply ignored
    return <Block color={randomColor} key={key}>{item}</Block>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
