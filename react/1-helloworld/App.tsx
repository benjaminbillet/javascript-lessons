import * as React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  render() {
    return <div>Hello world!</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
