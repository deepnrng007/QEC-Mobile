import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

import AuthReducer from './AuthReducer';
import ProductReducer from './ProductReducer';
import ReportReducer from './ReportReducer';

const AppReducers = combineReducers({
  AuthReducer,
  ProductReducer,
  ReportReducer,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
