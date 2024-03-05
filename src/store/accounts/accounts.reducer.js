import { ACCOUNTS_ACTION_TYPES } from './accounts.types';

const initialState = {
  accounts: null,
  account: null,
  cashAccounts: { accounts: null, totalAmount: null },
  creditAccounts: { accounts: null, totalAmount: null },
  loanAccounts: { accounts: null, totalAmount: null },
  error: null,
  isLoading: false
};

const accountsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTS_ACTION_TYPES.GET_ACCOUNTS_BALANCE_SUCCESS:
    case ACCOUNTS_ACTION_TYPES.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: payload.accounts,
        cashAccounts: {
          ...state.cashAccounts,
          accounts: payload.cashAccounts,
          totalAmount: payload.cashAmount
        },
        creditAccounts: {
          ...state.creditAccounts,
          accounts: payload.creditAccounts,
          totalAmount: payload.creditAmount
        },
        loanAccounts: {
          ...state.loanAccounts,
          accounts: payload.loanAccounts,
          totalAmount: payload.loanAmount
        }
      };

    case ACCOUNTS_ACTION_TYPES.GET_ACCOUNT_BALANCE_SUCCESS:
      return {
        ...state,
        account: payload.account
      };

    case ACCOUNTS_ACTION_TYPES.GET_ACCOUNT_BALANCE_FAILED:
    case ACCOUNTS_ACTION_TYPES.GET_ACCOUNTS_BALANCE_FAILED:
    case ACCOUNTS_ACTION_TYPES.DELETE_ACCOUNT_FAILED:
      return {
        ...state,
        error: payload
      };

    case ACCOUNTS_ACTION_TYPES.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default accountsReducer;
