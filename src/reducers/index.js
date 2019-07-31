import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import chartReducer from './chart';
import chatReducer from './chat';
import loginReducer from './login';

export default history => combineReducers({
  router: connectRouter(history),
  chartReducer,
  chatReducer,
  loginReducer,
});
