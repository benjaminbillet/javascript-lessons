import * as React from 'react';
import ReactDOM from 'react-dom';

// two HOCs
import makeBordered from './makeBordered';
import makeShadowed from './makeShadowed';

import Block from './Block';


// we use the HOC to create two bordered components
const GreenBorderedBlock = makeBordered(Block, '#a6e22e');
(GreenBorderedBlock as any).someStaticMethod(); // the static method is properly mapped, but we have to trick typescript a little bit

const OrangeBorderedBlock = makeBordered(Block, '#fd971f');

// HOC can be composed
const OrangeBorderedBlockWithShadow = makeShadowed(makeBordered(Block, '#fd971f'));


export default class App extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <GreenBorderedBlock color="purple" ref={(ref: any) => ref && ref.someMethod() }>1</GreenBorderedBlock>
        <OrangeBorderedBlock color="purple" ref={(ref: any) => ref && ref.someMethod() }>2</OrangeBorderedBlock>
        <OrangeBorderedBlockWithShadow color="purple" ref={(ref: any) => ref && ref.someMethod() }>3</OrangeBorderedBlockWithShadow>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
