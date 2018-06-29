import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('store', 'actions') @observer
class App extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    actions: PropTypes.object,
  }

  static defaultProps = {
    store: {},
    actions: {},
  }

  render() {
    const { store, actions } = this.props;
    return (
      <div>react redux hello world {this.props.store.a}
        <div>todos:{store.todos}</div>
        <button onClick={() => actions.add()}>点击加1</button>
        <button onClick={() => actions.remove()}>点击减1</button>
      </div>
    );
  }
}
export default withRouter(App);
