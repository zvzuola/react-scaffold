import { observable } from 'mobx';

class Store {
  @observable todos;
  @observable a;

  constructor() {
    this.todos = [1, 2, 3];
    this.a = 100;
  }
}
export default new Store();
