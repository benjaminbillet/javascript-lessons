import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from './store';

type StyleSheet = { [k: string]: React.CSSProperties };

const styles: StyleSheet= {
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    margin: 20,
    borderStyle: 'solid',
    borderColor: 'black',
  },
};

interface Props {
  color: string;
  border: number;
}

class Block extends React.Component<Props> {
  render() {
    const { color, border, children } = this.props;
    return (
      <div style={{ ...styles.block, borderWidth: border, backgroundColor: color }}>
        {children}
      </div>
    );
  }
}

const ConnectedBlock = connect(
  (state: AppState) => {
    return {
      color: state.color.currentColor,
      border: state.border.width,
    };
  },
)(Block);

export default ConnectedBlock;