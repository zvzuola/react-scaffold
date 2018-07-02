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

import todosStore from './todos';
import usersStore from './users';

export default todosStore;
export { todosStore, usersStore };
