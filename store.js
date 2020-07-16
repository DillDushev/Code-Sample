import {createStore, combineReducers} from 'redux';

const arr = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...action.arr];
    case 'CHANGE':
      const id = state.findIndex(o => o.id === action.id)
      return [
        ...state.slice(0, id),
    		{...state[id], name: action.name},
        ...state.slice(id + 1)
      ];
    default:
      return state
    }
};

const index = (state = 0, action) => {
	switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1 < 0 ? 0 : state - 1;
    case 'SET':
      return action.index;
    default:
      return state
    }
}

export const makeStore = (initialState) => {
    return createStore(combineReducers({arr, index}), initialState);
};

export const PAGE_ITEMS = 1200;

export const displayArr = (arr, index) => {
  return arr.slice(index * PAGE_ITEMS, (index + 1) * PAGE_ITEMS)
    .map((a, i) => ({ id: index*PAGE_ITEMS + i, avatar: a.avatar, name: a.name})    )
}