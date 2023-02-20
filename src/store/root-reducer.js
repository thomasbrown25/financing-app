import { combineReducers } from 'redux';

import transactionsReducer from './transactions/transactions.reducer';
import userReducer from './user/user.reducer';
import liabilitiesReducer from './liabilities/liabilities.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  transactions: transactionsReducer,
  liabilities: liabilitiesReducer
});
