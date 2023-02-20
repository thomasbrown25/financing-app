import { TRANSACTIONS_ACTION_TYPES } from './transactions.types';

const initialState = {
  transactions: null,
  recentTransactions: null,
  categories: { labels: null, amounts: null, list: null },
  recurringTransactions: null,
  accounts: null,
  cashAmount: null,
  expenseTransactions: null,
  incomeTransactions: null,
  currentMonthExpense: 0,
  currentMonthIncome: 0,
  error: null,
  isLoading: false
};

const transactionsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TRANSACTIONS_ACTION_TYPES.GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: payload.transactions,
        accounts: payload.accounts,
        cashAmount: payload.cashAmount
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

    case TRANSACTIONS_ACTION_TYPES.GET_RECURRING_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        recurringTransactions: payload.transactions,
        expenseTransactions: payload.expense,
        incomeTransactions: payload.income
      };

    case TRANSACTIONS_ACTION_TYPES.GET_CURRENT_SPEND_MONTH_SUCCESS:
      return {
        ...state,
        currentMonthExpense: payload.expense,
        currentMonthIncome: payload.income
      };

    case TRANSACTIONS_ACTION_TYPES.GET_RECENT_TRANSACTIONS_FAILED:
    case TRANSACTIONS_ACTION_TYPES.GET_RECURRING_TRANSACTIONS_FAILED:
    case TRANSACTIONS_ACTION_TYPES.GET_CURRENT_SPEND_MONTH_FAILED:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
};

export default transactionsReducer;
