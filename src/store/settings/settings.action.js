import { USER_ACTION_TYPES } from 'store/user/user.types';
import { api } from '../../utils/api.utils';

import { SETTINGS_ACTION_TYPES } from './settings.types';

/**
 ** GET: "/api/frequency"
 * @param reqBody: null
 **/
export const getSettings = () => async (dispatch) => {
  try {
    const response = await api.get('/api/usersetting');

    dispatch({
      type: SETTINGS_ACTION_TYPES.GET_SETTINGS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: SETTINGS_ACTION_TYPES.GET_SETTINGS_FAILED,
      payload: error?.response
    });
  }
};
