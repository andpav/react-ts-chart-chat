import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import chartReducer from './chart'
import loginReducer from './login'

export default (history) => combineReducers({
  router: connectRouter(history),
  chartReducer: chartReducer,
  loginReducer: loginReducer,
});
