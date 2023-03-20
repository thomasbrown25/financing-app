import { SETTINGS_ACTION_TYPES } from './settings.types';

const initialState = {
  settings: null,
  error: null,
  isLoading: false
};

const settingsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SETTINGS_ACTION_TYPES.GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: payload,
        error: null
      };

    case SETTINGS_ACTION_TYPES.GET_SETTINGS_FAILED:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
};

export default settingsReducer;
