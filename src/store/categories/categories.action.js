import { USER_ACTION_TYPES } from 'store/user/user.types';
import { api } from '../../utils/api.utils';

import { CATEGORIES_ACTION_TYPES } from './categories.types';

/**
 ** GET: "/category"
 * @param reqBody: null
 **/
export const getCategories = () => async (dispatch) => {
  try {
    const response = await api.get('/category');

    dispatch({
      type: CATEGORIES_ACTION_TYPES.GET_CATEGORIES_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: CATEGORIES_ACTION_TYPES.GET_CATEGORIES_FAILED,
      payload: error?.response
    });
  }
};

/**
 ** GET: "/category/refresh"
 * @param reqBody: null
 **/
export const refreshCategories = () => async (dispatch) => {
  try {
    const response = await api.post(`/category/refresh`);

    dispatch({
      type: CATEGORIES_ACTION_TYPES.REFRESH_CATEGORIES_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: CATEGORIES_ACTION_TYPES.REFRESH_CATEGORIES_FAILED,
      payload: error?.response
    });
  }
};

/**
 ** POST: "/category"
 * @param category: string
 **/
export const addCategory = (category) => async (dispatch) => {
  try {
    const response = await api.post(`/category`, { name: category });

    dispatch({
      type: CATEGORIES_ACTION_TYPES.ADD_CATEGORIES_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: CATEGORIES_ACTION_TYPES.ADD_CATEGORIES_FAILED,
      payload: error?.response
    });
  }
};
