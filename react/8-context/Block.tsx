import * as React from 'react';
import { SomeContext } from './Context';


type StyleSheet = { [k: string]: React.CSSProperties };
const styles: StyleSheet= {
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    margin: 20,
  },
};

interface Props {
  color: string;
}

export default class Block extends React.Component<Props> {
  render() {
    const { color } = this.props;

    // the Consumer children is a function that receives the shared property
    return (
      <SomeContext.Consumer>
        {value => <div style={{ ...styles.block, backgroundColor: color }}>{value}</div>}
      </SomeContext.Consumer>
    );
  }
}
