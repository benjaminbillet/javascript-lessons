import * as React from 'react';
import ReactDOM from 'react-dom';

import Block from './Block';


interface State {
  color: string;
}
interface Props {
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      color: '#a6e22e',
    };
  }

  // there is three kind of events in a component lifecycle:
  // - initial mount: the component is instantiated and inserted into the DOM for the first time
  //   the order of method calls will be: constructor(), getDerivedStateFromProps(), render(), componentDidMount()
  // - updating: the component is re-rendered because its state or props changed
  //   the order of method calls will be: getDerivedStateFromProps(), shouldComponentUpdate(), render(), componentDidUpdate()
  // - unmount: the component instance is removed from the DOM and destroyed

  componentDidMount() {
    // called after the first time the component is rendered
    console.log('App#componentDidMount');
    console.log('== end of App initial mount ==');
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    // called after an update
    console.log('App#componentDidUpdate', prevProps, prevState);
    console.log('== end of App update ==');
  }

  componentWillUnmount() {
    // called before the component is destroyed
    console.log('App#componentWillUnmount');
    console.log('== end of App unmount ==');
  }

  shouldComponentUpdate(nextProps: Props, nextState: Props) {
    // this function can be used for optimization purpose
    // it gives you the chance to abort the rendering after a props/state update
    // if this function returns false, render() will not be called (except on initial mount/forced update)
    console.log('App#shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // called before any call to the render method
    // can return an object to update the state or null to do nothing
    console.log('App#getDerivedStateFromProps', props, state);
    return null;
  }

  render() {
    const { color } = this.state;
    console.log('App#render');
    return (
      <div onClick={this.changeColor}>
        <Block color={color}>Click me!</Block>
      </div>
    );
  }

  changeColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`;
    this.setState({ color: randomColor });
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
