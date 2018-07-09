import * as React from 'react';
import ReactDOM from 'react-dom';
import cssStyles from './App.css';

type StyleSheet = { [k: string]: React.CSSProperties };

const styleObjects: StyleSheet= {
  borderblock: {
    padding: 10,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#fd971f',
    margin: 10,
  },
  grayblock: {
    backgroundColor: '#ccc',
  }
};

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className={cssStyles.borderblock}>Styled with CSS</div>
        <div className={[cssStyles.borderblock, cssStyles.grayblock].join(' ')}>Styled with many CSS</div>
        <div style={styleObjects.borderblock}>Styled with style object</div>
        <div style={{
          padding: 10,
          textAlign: 'center',
          borderStyle: 'solid',
          borderWidth: 5,
          borderColor: '#fd971f',
          margin: 10,
        }}>
          Styled with inline style object
        </div>
        <div style={{ ...styleObjects.borderblock, ...styleObjects.grayblock }}>Styled with many style objects</div>
        <div className={cssStyles.borderblock} style={styleObjects.grayblock}>Styled with CSS and style object</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
