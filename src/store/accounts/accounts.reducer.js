import { ACCOUNTS_ACTION_TYPES } from './accounts.types';

const initialState = {
  accounts: null,
  account: null,
  cashAccounts: { accounts: null, totalAmount: null },
  creditAccounts: { accounts: null, totalAmount: null },
  error: null,
  isLoading: false
};

const accountsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTS_ACTION_TYPES.GET_ACCOUNTS_BALANCE_SUCCESS:
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
        }
      };

    case ACCOUNTS_ACTION_TYPES.GET_ACCOUNT_BALANCE_SUCCESS:
      return {
        ...state,
        account: payload.account
      };

    case ACCOUNTS_ACTION_TYPES.GET_ACCOUNT_BALANCE_FAILED:
    case ACCOUNTS_ACTION_TYPES.GET_ACCOUNTS_BALANCE_FAILED:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
};

export default accountsReducer;
