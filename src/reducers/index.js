import { combineReducers } from 'redux';

export default combineReducers({
  list: (state = { todos: [1, 2, 3] }, action) => {
    switch (action.type) {
    default:
      return state;
    }
  },
});
