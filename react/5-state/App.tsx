import * as React from 'react';
import ReactDOM from 'react-dom';

import Block from './Block';

// component can have an internal state (a plain JS object)
// when this state is modified, react triggers a re-render:
// re-rendering means that react reapplies render() for elements that are impacted by the state updates
// after the re-rendering, react compares the new virtual DOM to the previous one, computes the differences (diffing) and updates the actual DOM accordingly (reconciliation)


// with typescript enabled, the Component class is parameterized with a definition of the state object
// our component state will only contain a color
interface State {
  color: string;
}
interface Props { // no props
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    // the constructor receives the props and we pass it to the parent class
    super(props);

    // the component state is stored in this.state
    // here, in the constructor, we define the initial state
    this.state = {
      color: '#a6e22e',
    };
  }

  render() {
    // the state can be accessed from this.state
    const { color } = this.state;

    console.log('render');

    // we wrap a Block into a clickable div
    // when clicked, this.changeColor will be called
    return (
      <div onClick={this.changeColor}>
        <Block color={color}>Click me!</Block>
      </div>
    );
  }

  // we use an arrow function to capture 'this' properly
  changeColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`;
    // the state must be updated using the 'setState' primitive in order to trigger re-rendering
    // react will merge the object you provide into the state
    this.setState({ color: randomColor });
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
