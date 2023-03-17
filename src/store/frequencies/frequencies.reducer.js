import { FREQUENCIES_ACTION_TYPES } from './frequencies.types';

const initialState = {
  frequencies: null,
  error: null,
  isLoading: false
};

const frequenciesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FREQUENCIES_ACTION_TYPES.GET_FREQUENCIES_SUCCESS:
    case FREQUENCIES_ACTION_TYPES.ADD_FREQUENCIES_SUCCESS:
    case FREQUENCIES_ACTION_TYPES.REFRESH_FREQUENCIES_SUCCESS:
      return {
        ...state,
        frequencies: payload.frequencies,
        error: null
      };

    case FREQUENCIES_ACTION_TYPES.GET_FREQUENCIES_FAILED:
    case FREQUENCIES_ACTION_TYPES.REFRESH_FREQUENCIES_FAILED:
    case FREQUENCIES_ACTION_TYPES.ADD_FREQUENCIES_FAILED:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
};

export default frequenciesReducer;
