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
interface State { // no state
}

export default class Block extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Block#componentDidMount');
    console.log('== end of Block initial mount ==');
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log('Block#componentDidUpdate', prevProps, prevState);
    console.log('== end of Block update ==');
  }

  componentWillUnmount() {
    console.log('Block#componentWillUnmount');
    console.log('== end of Block unmount ==');
  }

  shouldComponentUpdate(nextProps: Props, nextState: Props) {
    console.log('Block#shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    console.log('Block#getDerivedStateFromProps', props, state);
    return null;
  }

  render() {
    const { color, children } = this.props;
    console.log('Block#render');
    return (
      <div style={{ ...styles.block, backgroundColor: color }}>{children}</div>
    );
  }
}
