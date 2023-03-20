import { USER_ACTION_TYPES } from 'store/user/user.types';
import { api } from '../../utils/api.utils';

import { TRANSACTIONS_ACTION_TYPES } from './transactions.types';

/** Calls the financing-api service to get transactions from plaid api
 ** GET: "/transactions"
 * @param reqBody: string: accessToken
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

/** Calls the financing-api service to get transactions from plaid api
 ** GET: "/api/transactions"
 * @param reqBody: string: accessToken
 **/
export const refreshTransactions = () => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTIONS_ACTION_TYPES.SYNCING });

    const response = await api.post('/api/transactions/refresh');

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.REFRESH_TRANSACTIONS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.REFRESH_TRANSACTIONS_FAILED,
      payload: error?.response
    });
  }
};

/** Calls the financing-api service to get transactions from plaid api
 ** GET: "/api/transactions"
 * @param reqBody: string: accessToken
 **/
export const getRecentTransactions = () => async (dispatch) => {
  try {
    const response = await api.get('/api/transactions/recent');

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
 ** GET: "/api/transactions/current-spend-month"
 * @param reqBody: string: accessToken
 **/
export const getCurrentSpendForMonth = () => async (dispatch) => {
  try {
    const response = await api.get('/api/transactions/current-spend-month');

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
 ** GET: "/api/transactions/recurring"
 * @param reqBody: string: accessToken
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

/**
 ** POST: "/api/transactions/recurring"
 * @param reqBody: string: accessToken
 **/
export const updateRecurringTransactions =
  (newTransaction) => async (dispatch) => {
    try {
      const response = await api.post(
        `/api/transactions/recurring/${newTransaction.id}`,
        newTransaction
      );

      dispatch({
        type: TRANSACTIONS_ACTION_TYPES.UPDATE_RECURRING_TRANSACTIONS_SUCCESS,
        payload: response.data.data
      });
    } catch (error) {
      console.log(error, error.message);
      dispatch({
        type: TRANSACTIONS_ACTION_TYPES.UPDATE_RECURRING_TRANSACTIONS_FAILED,
        payload: error?.response
      });
    }
  };

export const updateIncome = (income) => async (dispatch) => {
  try {
    const response = await api.post(
      `/api/transactions/recurring/income/${income.id}`,
      income
    );

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.UPDATE_INCOME_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.UPDATE_INCOME_FAILED,
      payload: error?.response
    });
  }
};

export const addRecurringTransaction = (transaction) => async (dispatch) => {
  try {
    const response = await api.post(`/api/transactions/recurring`, transaction);

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.ADD_RECURRING_TRANSACTIONS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.ADD_RECURRING_TRANSACTIONS_FAILED,
      payload: error?.response
    });
  }
};

export const disableRecurringTransaction =
  (transactionId) => async (dispatch) => {
    try {
      const response = await api.post(
        `/api/transactions/recurring/disable/${transactionId}`
      );

      dispatch({
        type: TRANSACTIONS_ACTION_TYPES.DISABLE_RECURRING_TRANSACTIONS_SUCCESS,
        payload: response.data.data
      });
    } catch (error) {
      console.log(error, error.message);
      dispatch({
        type: TRANSACTIONS_ACTION_TYPES.DISABLE_RECURRING_TRANSACTIONS_FAILED,
        payload: error?.response
      });
    }
  };

/** Calls the financing-api service to get the recurring transactions
 ** GET: "/api/transactions/recurring"
 * @param reqBody: string: accessToken
 **/
export const refreshRecurringTransactions = () => async (dispatch) => {
  try {
    const response = await api.post('/api/transactions/recurring/refresh');

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.REFRESH_RECURRING_TRANSACTIONS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.REFRESH_RECURRING_TRANSACTIONS_FAILED,
      payload: error?.response
    });
  }
};

/** Calls the financing-api service to get the recurring transactions
 ** GET: "/api/transactions/recurring"
 * @param reqBody: string: accessToken
 **/
export const getExpenses = () => async (dispatch) => {
  try {
    const response = await api.get('/api/transactions/expenses');

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
      `/api/transactions/account-transactions/${accountId}`
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

export const deleteIncome = (incomeId) => async (dispatch) => {
  try {
    const response = await api.delete(`/api/transactions/income/${incomeId}`);

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.DELETE_INCOME_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.DELETE_INCOME_FAILED,
      payload: error?.response
    });
  }
};

export const setIncomeActive = (incomeId, isActive) => async (dispatch) => {
  try {
    const response = await api.post(
      `/api/transactions/income/activate/${incomeId}`,
      {
        isActive
      }
    );

    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.SET_INCOME_ACTIVE_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: TRANSACTIONS_ACTION_TYPES.SET_INCOME_ACTIVE_FAILED,
      payload: error?.response
    });
  }
};
