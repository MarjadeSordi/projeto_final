import { createStore } from 'redux';
import combineReducers from './reducers';

export const Store = createStore(combineReducers);

export default Store;