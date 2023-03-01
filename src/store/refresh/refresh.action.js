import { api } from '../../utils/api.utils';
import { REFRESH_ACTION_TYPES } from './refresh.types';

export const refreshAll = () => async (dispatch) => {
  try {
    dispatch({ type: REFRESH_ACTION_TYPES.REFRESH_SYNCING });

    const response = await api.post('/refresh/all');

    dispatch({
      type: REFRESH_ACTION_TYPES.REFRESH_SUCCESS,
      payload: 'Success'
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: REFRESH_ACTION_TYPES.REFRESH_FAILED,
      payload: error?.response
    });
  }
};