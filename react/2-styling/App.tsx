// react supports two types of styling:
// - css styles: css files can be imported like any javascript modules, thanks to css-loader and style-loader (see webpack.config.js)
// - style objects: plain javascript objects that represents a style

import * as React from 'react';
import ReactDOM from 'react-dom';
import cssStyles from './App.css'; // a regular css import


// the imported css style is actually an object that maps the class names defined in the css files to modularized class names
console.log(cssStyles);
// == Output ==
// { borderblock: "App_borderblock_1DaOFCbVRHFrHpiC-gG6k1", grayblock: "App_grayblock_2IsAZSAhWOmOpEpuhvu8rK" }
// note: suffixes may be a little bit different


type StyleSheet = { [k: string]: React.CSSProperties };

// an object containing two style objects
const styleObjects: StyleSheet= {
  borderblock: {
    padding: 10, // we do not specify the unit
    textAlign: 'center', // attribute names are specified in camelCase
    borderStyle: 'solid', // keywords are strings
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
    // JSX tags can have attributes
    // example: <x myAttribute1="aStringConstant" myAttribute2={aVariable} />
    // JSX tags can have children
    // example: <x>Plain text child</x> or <x><y></y><z></z></x>

    // css styles are applied using the className attribute
    // style objects are applied using the style attribute

    // you can mix css styles by simply concatenating their names
    // you can mix style objects using the spread operator
    return (
      <div>
        <div className={cssStyles.borderblock}>Styled with CSS</div>
        <div className={[cssStyles.borderblock, cssStyles.grayblock].join(' ')}>Styled with mixed CSS styles</div>
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
        <div style={{ ...styleObjects.borderblock, ...styleObjects.grayblock }}>Styled with mixed style objects</div>
        <div className={cssStyles.borderblock} style={styleObjects.grayblock}>Styled with mixed CSS and style object</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
