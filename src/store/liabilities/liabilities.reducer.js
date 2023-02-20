import { LIABILITIES_ACTION_TYPES } from './liabilities.types';

const initialState = {
  liabilities: null,
  error: null,
  isLoading: false
};

const liabilitiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LIABILITIES_ACTION_TYPES.GET_LIABILITIES_SUCCESS:
      return {
        ...state,
        liabilities: payload.liabilities
      };

    case LIABILITIES_ACTION_TYPES.GET_LIABILITIES_FAILED:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
};

export default liabilitiesReducer;
