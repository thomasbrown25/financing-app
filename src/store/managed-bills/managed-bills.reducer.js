import { MANAGEDBILLS_ACTION_TYPES } from './managed-bills.types';

const initialState = {
  bills: null,
  error: null,
  isLoading: false
};

const managedBillsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MANAGEDBILLS_ACTION_TYPES.GET_MANAGED_BILLS_SUCCESS:
    case MANAGEDBILLS_ACTION_TYPES.SAVE_MANAGED_BILL_SUCCESS:
      return {
        ...state,
        bills: payload,
        error: null
      };

    case MANAGEDBILLS_ACTION_TYPES.GET_MANAGED_BILLS_FAILED:
    case MANAGEDBILLS_ACTION_TYPES.SAVE_MANAGED_BILL_FAILED:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
};

export default managedBillsReducer;
