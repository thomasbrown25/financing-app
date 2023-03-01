import { TRANSACTIONS_ACTION_TYPES } from './transactions.types';

const initialState = {
  transactions: null,
  recentTransactions: null,
  categories: { labels: null, amounts: null, list: null },
  recurringTransactions: null,
  selectedTransactions: null,
  expenses: null,
  incomes: null,
  currentMonthExpense: 0,
  currentMonthIncome: 0,
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
        transactions: payload.transactions
      };

    case TRANSACTIONS_ACTION_TYPES.GET_RECENT_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        recentTransactions: payload.transactions,
        categories: {
          ...state,
          list: payload.categories,
          labels: payload.categoryLabels,
          amounts: payload.categoryAmounts
        }
      };

    case TRANSACTIONS_ACTION_TYPES.REFRESH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        syncing: false
      };

    case TRANSACTIONS_ACTION_TYPES.SYNCING:
      return {
        ...state,
        syncing: true
      };

    case TRANSACTIONS_ACTION_TYPES.GET_RECURRING_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        recurringTransactions: payload.transactions,
        expenses: payload.expenses,
        incomes: payload.incomes
      };

    case TRANSACTIONS_ACTION_TYPES.GET_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: payload.expenses
      };

    case TRANSACTIONS_ACTION_TYPES.GET_CURRENT_SPEND_MONTH_SUCCESS:
      return {
        ...state,
        currentMonthExpense: payload.expense,
        currentMonthIncome: payload.income
      };

    case TRANSACTIONS_ACTION_TYPES.GET_ACCOUNT_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        selectedTransactions: payload.transactions
      };

    case TRANSACTIONS_ACTION_TYPES.DELETE_INCOME_SUCCESS:
      return {
        ...state,
        incomes: payload.incomes
      };

    case TRANSACTIONS_ACTION_TYPES.GET_RECENT_TRANSACTIONS_FAILED:
    case TRANSACTIONS_ACTION_TYPES.GET_RECURRING_TRANSACTIONS_FAILED:
    case TRANSACTIONS_ACTION_TYPES.GET_EXPENSES_FAILED:
    case TRANSACTIONS_ACTION_TYPES.GET_CURRENT_SPEND_MONTH_FAILED:
    case TRANSACTIONS_ACTION_TYPES.GET_ACCOUNT_TRANSACTIONS_FAILED:
    case TRANSACTIONS_ACTION_TYPES.REFRESH_TRANSACTIONS_FAILED:
    case TRANSACTIONS_ACTION_TYPES.DELETE_INCOME_FAILED:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
};

export default transactionsReducer;
