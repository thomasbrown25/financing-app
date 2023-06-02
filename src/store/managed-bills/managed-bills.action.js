import { api } from '../../utils/api.utils';

import { MANAGEDBILLS_ACTION_TYPES } from './managed-bills.types';

/**
 ** GET: "/api/frequency"
 * @param reqBody: null
 **/
export const getBills = () => async (dispatch) => {
  try {
    const response = await api.get('/api/managedbills');

    dispatch({
      type: MANAGEDBILLS_ACTION_TYPES.GET_MANAGED_BILLS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: MANAGEDBILLS_ACTION_TYPES.GET_MANAGED_BILLS_FAILED,
      payload: error?.response
    });
  }
};

export const deleteBill = (billId) => async (dispatch) => {
  try {
    const response = await api.delete(`/api/managedbills/${billId}`);

    dispatch({
      type: MANAGEDBILLS_ACTION_TYPES.DELETE_MANAGED_BILL_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: MANAGEDBILLS_ACTION_TYPES.DELETE_MANAGED_BILL_FAILED,
      payload: error?.response
    });
  }
};

export const updateBill = (updatedBill) => async (dispatch) => {
  try {
    const response = await api.post(
      `/api/managedbills/${updatedBill.id}`,
      updatedBill
    );

    dispatch({
      type: MANAGEDBILLS_ACTION_TYPES.UPDATE_MANAGED_BILL_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: MANAGEDBILLS_ACTION_TYPES.UPDATE_MANAGED_BILL_FAILED,
      payload: error?.response
    });
  }
};

export const addBill = (newBill) => async (dispatch) => {
  try {
    const response = await api.post(`/api/managedbills`, newBill);

    dispatch({
      type: MANAGEDBILLS_ACTION_TYPES.ADD_MANAGED_BILL_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: MANAGEDBILLS_ACTION_TYPES.ADD_MANAGED_BILL_FAILED,
      payload: error?.response
    });
  }
};
