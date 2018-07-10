import * as React from 'react';

type StyleSheet = { [k: string]: React.CSSProperties };

const styles: StyleSheet= {
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
};

// with typescript enabled, the Component class is parameterized with a definition of the prop types
// our component will receive one string property called 'color' and one number property called 'size'
interface Props {
  color: string;
  size?: number;
}

export default class Block extends React.Component<Props> {
  render() {
    // property are accessed using this.props
    // property are read-only
    // the 'children' property is always defined and represents the children of our component
    // here, we will simply wrap these children into a colored box
    const { color, children } = this.props;
    let size = 200;
    if (this.props.size != null) {
      size = this.props.size;
    }
    return (
      <div style={{ ...styles.block, width: size, height: size, backgroundColor: color }}>{children}</div>
    );
  }
}
