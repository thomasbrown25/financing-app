import { USER_ACTION_TYPES } from 'store/user/user.types';
import { api } from '../../utils/api.utils';

import { FREQUENCIES_ACTION_TYPES } from './frequencies.types';

/**
 ** GET: "/api/frequency"
 * @param reqBody: null
 **/
export const getFrequencies = () => async (dispatch) => {
  try {
    const response = await api.get('/api/frequency');

    dispatch({
      type: FREQUENCIES_ACTION_TYPES.GET_FREQUENCIES_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: FREQUENCIES_ACTION_TYPES.GET_FREQUENCIES_FAILED,
      payload: error?.response
    });
  }
};

/**
 ** POST: "/api/frequency"
 * @param frequency: string
 **/
export const addfrequency = (frequency) => async (dispatch) => {
  try {
    const response = await api.post(`/api/frequency`, { name: frequency });

    dispatch({
      type: FREQUENCIES_ACTION_TYPES.ADD_FREQUENCIES_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: FREQUENCIES_ACTION_TYPES.ADD_FREQUENCIES_FAILED,
      payload: error?.response
    });
  }
};
