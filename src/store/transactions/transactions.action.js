import { USER_ACTION_TYPES } from 'store/user/user.types';
import { api } from '../../utils/api.utils';

import { TRANSACTIONS_ACTION_TYPES } from './transactions.types';

/** Calls the financing-api service to get transactions from plaid api
 ** GET: "/api/transactions"
 * @param null
 **/
export const getTransactions = () => async (dispatch) => {
  try {
    const response = await api.get('/api/transactions');

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_TRANSACTIONS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_TRANSACTIONS_FAILED,
      payload: error?.response
    });
  }
};

/** Calls the financing-api service to get the recurring transactions
 ** GET: "/api/transactions/recurring"
 * @param null
 **/
export const getRecurringTransactions = () => async (dispatch) => {
  try {
    const response = await api.get('/api/transactions/recurring');

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_RECURRING_TRANSACTIONS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_RECURRING_TRANSACTIONS_FAILED,
      payload: error?.response
    });
  }
};

/** Calls the financing-api service to get recent bills
 ** GET: "/api/transactions/recent-bills"
 * @param null
 **/
export const getRecentBills = () => async (dispatch) => {
  try {
    const response = await api.get('/api/transactions/recent-bills');

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_RECENTBILLS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_RECENTBILLS_FAILED,
      payload: error?.response
    });
  }
};

/** Calls the financing-api service to get the transactions for a specific account using plaid api
 ** GET: "/api/transactions/account/{accountId}"
 * @param accountId: string
 **/
export const getAccountTransactions = (accountId) => async (dispatch) => {
  try {
    const response = await api.get(`/api/transactions/account/${accountId}`);

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_ACCOUNT_TRANSACTIONS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_ACCOUNT_TRANSACTIONS_FAILED,
      payload: error?.response
    });
  }
};
