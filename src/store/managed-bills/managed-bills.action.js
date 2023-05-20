import { api } from '../../utils/api.utils';

import { MANAGEDBILLS_ACTION_TYPES } from './managed-bills.types';

/**
 ** GET: "/api/frequency"
 * @param reqBody: null
 **/
export const getBills = () => async (dispatch) => {
  try {
    const response = await api.get('/api/managed-bills');

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
    const response = await api.delete(`/api/managed-bills/${billId}`);

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

export const saveBill = (updatedBill) => async (dispatch) => {
  try {
    const response = await api.post(
      `/api/managed-bills/${updatedBill.id}`,
      updatedBill
    );

    dispatch({
      type: MANAGEDBILLS_ACTION_TYPES.SAVE_MANAGED_BILL_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: MANAGEDBILLS_ACTION_TYPES.SAVE_MANAGED_BILL_FAILED,
      payload: error?.response
    });
  }
};

export const addBill = (newBill) => async (dispatch) => {
  try {
    const response = await api.post(`/api/managed-bills`, newBill);

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
