import { USER_ACTION_TYPES } from 'store/user/user.types';
import { api } from '../../utils/api.utils';

import { LIABILITIES_ACTION_TYPES } from './liabilities.types';

/** Calls the financing-api service to get liabilities from plaid api
 ** GET: "/liabilities"
 * @param reqBody: string: accessToken
 **/
export const getLiabilities = () => async (dispatch) => {
  try {
    const response = await api.get('/liabilities');

    dispatch({
      type: LIABILITIES_ACTION_TYPES.GET_LIABILITIES_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: LIABILITIES_ACTION_TYPES.GET_LIABILITIES_FAILED,
      payload: error?.response
    });
  }
};
