import { action } from 'mobx';
import store from '../store';

class Actions {
  constructor({ stores }) {
    this.store = stores;
  }
  @action
  add = () => {
    this.store.a += 1;
  }
  @action
  remove = () => {
    this.store.a -= 1;
  }
}
export default new Actions({ stores: store });
