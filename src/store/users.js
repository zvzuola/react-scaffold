import { observable } from 'mobx';

class UsersStore {
  @observable users;

  constructor() {
    this.users = [{ name: 'zv' }];
  }
}
export default new UsersStore();
