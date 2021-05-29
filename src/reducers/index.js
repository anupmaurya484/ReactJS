import { combineReducers } from 'redux';
import userReducer from './userReducer';
import Layout from './layout';


const reducers = combineReducers({
  user: userReducer,
  Layout: Layout,
});

export default reducers;