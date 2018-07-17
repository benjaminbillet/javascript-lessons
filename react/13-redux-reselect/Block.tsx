import * as React from 'react';

type StyleSheet = { [k: string]: React.CSSProperties };

const styles: StyleSheet= {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    margin: 20,
    borderWidth: 5,
    borderStyle: 'solid',
  },
};

interface Props {
  color: string;
  dark: string;
  light: string;
  border: string;
}

export default class Block extends React.Component<Props> {
  render() {
    const { color, border, dark, light, children } = this.props;
    return (
      <div style={styles.container}>
        <div style={{ ...styles.block, backgroundColor: light, borderColor: border }}>{children}</div>
        <div style={{ ...styles.block, backgroundColor: color, borderColor: border }}>{children}</div>
        <div style={{ ...styles.block, backgroundColor: dark, borderColor: border }}>{children}</div>
      </div>
    );
  }
}
