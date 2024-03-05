import { TRANSACTIONS_ACTION_TYPES } from './transactions.types';

const initialState = {
  transactions: null,
  recentBills: null,
  recentTransactions: null,
  categories: { labels: null, amounts: null, list: null },
  recurringTransactions: null,
  selectedTransactions: null,
  error: null,
  isLoading: false,
  syncing: false
};

const transactionsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TRANSACTIONS_ACTION_TYPES.GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: payload.transactions,
        recentBills: payload.recentBills
      };

    case TRANSACTIONS_ACTION_TYPES.GET_RECENTBILLS_SUCCESS:
      return {
        ...state,
        recentBills: payload.recentBills
      };

    case TRANSACTIONS_ACTION_TYPES.GET_RECURRING_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        expenses: payload.expenses
      };

    case TRANSACTIONS_ACTION_TYPES.GET_ACCOUNT_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        selectedTransactions: payload.transactions,
        todaySpend: payload.todaySpendAmount
      };

    case TRANSACTIONS_ACTION_TYPES.GET_RECENTBILLS_FAILED:
    case TRANSACTIONS_ACTION_TYPES.GET_RECURRING_TRANSACTIONS_FAILED:
    case TRANSACTIONS_ACTION_TYPES.GET_ACCOUNT_TRANSACTIONS_FAILED:
      return {
        ...state,
        error: payload
      };

    case TRANSACTIONS_ACTION_TYPES.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default transactionsReducer;
