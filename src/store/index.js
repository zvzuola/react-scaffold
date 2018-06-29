// import { createStore } from 'redux';
// import rootReducers from '../reducers';

// export default (initialState) => {
//   const store = createStore(rootReducers, initialState);
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('../reducers');
//       store.replaceReducer(nextRootReducer);
//     });
//   }
//   return store;
// };


import { observable } from 'mobx';

class Store {
  @observable todos;
  @observable a;

  constructor() {
    this.todos = [1, 2, 3];
    this.a = 222;
  }
}
export default new Store();
