import { action } from 'mobx';
import * as stores from '../store';

class Actions {
  constructor(opt) {
    this.todosStore = opt.todosStore;
    this.usersStore = opt.usersStore;
  }
  @action
  add = () => {
    this.todosStore.a += 1;
  }
  @action
  remove = () => {
    this.todosStore.a -= 1;
  }
  @action
  pushTodos = (item) => {
    this.todosStore.todos = this.todosStore.todos.concat(item || 1);
  }
  @action
  pushUsers = (item) => {
    this.usersStore.users = this.usersStore.users.concat(item || { name: 'zr' });
  }
}
export default new Actions(stores);
