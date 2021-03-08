import users from './users';
import rooms from './rooms';
import messages from './messages';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  users,
  rooms,
  messages,
});

export default rootReducer;
