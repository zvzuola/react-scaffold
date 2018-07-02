import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@inject('todosStore', 'usersStore', 'actions') @observer
class App extends React.Component {
  static propTypes = {
    todosStore: PropTypes.object,
    usersStore: PropTypes.object,
    actions: PropTypes.object,
  }

  static defaultProps = {
    todosStore: {},
    usersStore: {},
    actions: {},
  }

  render() {
    const { todosStore, actions, usersStore } = this.props;
    return (
      <div>
        <div>react redux hello world {todosStore.a}</div>
        <div>todos:{todosStore.todos}</div>
        <div>users:{usersStore.users.map(item => item.name)}</div>
        <button onClick={() => actions.add()}>点击加1</button>
        <button onClick={() => actions.remove()}>点击减1</button>
        <button onClick={() => actions.pushTodos(2)}>点击push todo</button>
        <button onClick={() => actions.pushUsers({ name: 'zrr' })}>点击push user</button>
        <DevTools />
      </div>
    );
  }
}
export default withRouter(App);
