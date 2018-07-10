import * as React from 'react';
import ReactDOM from 'react-dom';

// a react component is a child of the Component class
// it implements at least a render() method that defines how the component will be displayed
export default class App extends React.Component {
  render() {
    // this similar-but-not-exactly-HTML code is called JSX (JavaScript XML)
    // the JSX preprocessor will transform it in plain Javascript objects that represents a DOM-like structure (virtual DOM) that will be used internally by react to render the actual DOM
    return <div>Hello world!</div>;
  }
}

// ReactDOM enable us to render a react component into an element of the HTML page (see index.html)
ReactDOM.render(<App />, document.getElementById('app'));
