import { REFRESH_ACTION_TYPES } from './refresh.types';

const initialState = {
  refresh: null,
  refreshError: null,
  syncing: false,
  loading: false
};

const refreshReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REFRESH_ACTION_TYPES.REFRESH_SUCCESS:
      return {
        ...state,
        refresh: 'Success',
        syncing: false,
        refreshError: null
      };

    case REFRESH_ACTION_TYPES.REFRESH_SYNCING:
      return {
        ...state,
        syncing: true
      };

    case REFRESH_ACTION_TYPES.REFRESH_FAILED:
      return {
        ...state,
        syncing: false,
        refreshError: payload
      };

    default:
      return state;
  }
};

export default refreshReducer;
