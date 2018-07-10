import * as React from 'react';
import ReactDOM from 'react-dom';

import Block from './Block';


export default class App extends React.Component {
  render() {
    let element = <Block color="#a6e22e" />;
    
    // as previously stated, the variable 'element' does not contains an instance of Block
    // actually, it contains a ReactElement, i.e., an object that describes what to instantiate (the type of the component, the props to pass, etc.)
    // the actual instantiation is done later by react
    console.log(element);

    // to access the actual instance, you can use the 'ref' property
    // the 'ref' property takes a function that will be called with the instance given as parameter
    // it is up to you to decide where to store the instance (typically in 'this')
    element = <Block color="#a6e22e" ref={(ref: any) => ref && ref.someMethod() } />;

    return (
      <div>
        {element}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
