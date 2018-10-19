import { createStore } from 'redux';
import reducer from './projects/reducer';

const store = createStore(reducer);

export default store;