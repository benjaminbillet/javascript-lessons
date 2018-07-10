import * as React from 'react';

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
  someMethod() {
    console.log('method called!', this.props.color);
  }

  render() {
    const { color, children } = this.props;
    return (
      <div style={{ ...styles.block, backgroundColor: color }}>{children}</div>
    );
  }
}
