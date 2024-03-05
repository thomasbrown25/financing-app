import { CATEGORIES_ACTION_TYPES } from './categories.types';

const initialState = {
  categories: null,
  error: null,
  isLoading: false
};

const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.GET_CATEGORIES_SUCCESS:
    case CATEGORIES_ACTION_TYPES.ADD_CATEGORIES_SUCCESS:
    case CATEGORIES_ACTION_TYPES.REFRESH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.categories,
        error: null
      };

    case CATEGORIES_ACTION_TYPES.GET_CATEGORIES_FAILED:
    case CATEGORIES_ACTION_TYPES.REFRESH_CATEGORIES_FAILED:
    case CATEGORIES_ACTION_TYPES.ADD_CATEGORIES_FAILED:
      return {
        ...state,
        error: payload
      };

    case CATEGORIES_ACTION_TYPES.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default categoriesReducer;
