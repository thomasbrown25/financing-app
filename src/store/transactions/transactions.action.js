import { USER_ACTION_TYPES } from 'store/user/user.types';
import { api } from '../../utils/api.utils';

import { TRANSACTIONS_ACTION_TYPES } from './transactions.types';

/** Calls the financing-api service to get transactions from plaid api
 ** GET: "/transactions"
 * @param reqBody: string: accessToken
 **/
export const getTransactions = () => async (dispatch) => {
  try {
    const response = await api.get('/transactions');

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

/** Calls the financing-api service to get transactions from plaid api
 ** GET: "/transactions"
 * @param reqBody: string: accessToken
 **/
export const getRecentTransactions = () => async (dispatch) => {
  try {
    const response = await api.get('/transactions/recent');

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_RECENT_TRANSACTIONS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_RECENT_TRANSACTIONS_FAILED,
      payload: error?.response
    });
  }
};

/** Calls the financing-api service to get the current spend for the month
 ** GET: "/transactions/current-spend-month"
 * @param reqBody: string: accessToken
 **/
export const getCurrentSpendForMonth = () => async (dispatch) => {
  try {
    const response = await api.get('/transactions/current-spend-month');

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_CURRENT_SPEND_MONTH_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);

    if (
      error?.response?.data?.error?.errorCode?.toLowerCase() ===
      'itemloginrequired'
    ) {
      dispatch({
        type: USER_ACTION_TYPES.ITEM_LOGIN_REQUIRED
      });
    } else {
      dispatch({
        type: TRANSACTIONS_ACTION_TYPES.GET_CURRENT_SPEND_MONTH_FAILED,
        payload: error?.response
      });
    }
  }
};

/** Calls the financing-api service to get the recurring transactions
 ** GET: "/transactions/recurring"
 * @param reqBody: string: accessToken
 **/
export const getRecurringTransactions = () => async (dispatch) => {
  try {
    const response = await api.get('/transactions/recurring');

    console.log(response.data.data);

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

/** Calls the financing-api service to get the recurring transactions
 ** GET: "/transactions/recurring"
 * @param reqBody: string: accessToken
 **/
export const getExpenses = () => async (dispatch) => {
  try {
    const response = await api.get('/transactions/expenses');

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_EXPENSES_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.GET_EXPENSES_FAILED,
      payload: error?.response
    });
  }
};

export const getAccountTransactions = (accountId) => async (dispatch) => {
  try {
    const response = await api.get(
      `/transactions/account-transactions/${accountId}`
    );
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
