import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from './store';

interface Props {
  history: string[];
}

class History extends React.Component<Props> {
  render() {
    const { history } = this.props;
    const items = history.map(color => <div>{color}</div>);
    return (
      <div>{items}</div>
    );
  }
}

const ConnectedHistory = connect(
  (state: AppState) => {
    return {
      history: state.colorHistory,
    };
  },
)(History);

export default ConnectedHistory;