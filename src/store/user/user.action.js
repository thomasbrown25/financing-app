import { api } from '../../utils/api.utils';

import { USER_ACTION_TYPES } from './user.types';

/** Calls the API service to register a user and returns a jwt token
 ** POST: "/auth/register"
 * @param reqBody: { username, email, password }
 **/
export const register = (reqBody) => async (dispatch) => {
  try {
    console.log('calling register');
    const response = await api.post('/auth/register', reqBody);

    if (
      response.data.message.includes('A user with that email already exists')
    ) {
      dispatch({
        type: USER_ACTION_TYPES.REGISTER_FAILED,
        payload: response.data.message
      });
      return;
    }

    dispatch({
      type: USER_ACTION_TYPES.REGISTER_SUCCESS,
      payload: response.data
    });

    dispatch(loadUser());
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: USER_ACTION_TYPES.SIGN_IN_FAILED,
      payload: error
    });
  }
};

/** Calls the API service to login a user and returns a user object
 ** POST: "/auth/login"
 * @param reqBody: { email, password }
 **/
export const login = (reqBody) => async (dispatch) => {
  try {
    const response = await api.post('/auth/login', reqBody);

    dispatch({
      type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
      payload: response.data.data
    });

    dispatch(loadUser());
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: USER_ACTION_TYPES.SIGN_IN_FAILED,
      payload: error
    });
  }
};

/** Calls the API service to get user data and load user
 ** GET: "/auth/load-user"
 * @param reqBody: {  }
 **/
export const loadUser = () => async (dispatch) => {
  try {
    const response = await api.get('/auth/load-user');

    dispatch({
      type: USER_ACTION_TYPES.USER_LOADED,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
  }
};

/** Logs out the user by removing the jwt token in local storage
 * @param reqBody: {  }
 **/
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('token');
    dispatch({
      type: USER_ACTION_TYPES.SIGN_OUT
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: USER_ACTION_TYPES.SIGN_OUT_FAILED
    });
  }
};

/**
 * PLAID ACTIONS ******
 * */

/** Calls financing-api which calls Plaid api "/api/create_link_token" which
 *  returns a link-token.
 ** GET: "/plaid/create-link-token"
 * @param reqBody: { }
 **/
export const createLinkToken = () => async (dispatch) => {
  try {
    const response = await api.get('/plaid/create-link-token');

    dispatch({
      type: USER_ACTION_TYPES.CREATE_LINK_TOKEN_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: USER_ACTION_TYPES.CREATE_LINK_TOKEN_FAILED,
      payload: error
    });
  }
};

/** Calls financing-api which calls Plaid api "/public_token/exchange" and exhanges
 *  the publicToken for the accessToken
 ** POST: "/plaid/public-token-exchange"
 * @param publicToken: string: publicToken
 **/
export const publicTokenExchange = (publicToken) => async (dispatch) => {
  try {
    const response = await api.post(
      '/plaid/public-token-exchange',
      `"${publicToken}"`
    );

    dispatch({
      type: USER_ACTION_TYPES.PUBLIC_TOKEN_EXCHANGE_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: USER_ACTION_TYPES.PUBLIC_TOKEN_EXCHANGE_FAILED,
      payload: error
    });
  }
};

/** Calls financing-api which calls Plaid api "/plaid/update-link-token"
 ** POST: "/plaid/update-link-token"
 * @param null: null
 **/
export const updateLinkToken = () => async (dispatch) => {
  try {
    const response = await api.post('/plaid/update-link-token');

    dispatch({
      type: USER_ACTION_TYPES.UPDATE_LINK_TOKEN,
      payload: response.data
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: USER_ACTION_TYPES.UPDATE_LINK_TOKEN_FAILED,
      payload: error
    });
  }
};

/** Calls financing-api to save sidebar color
 ** POST: "/api/user/settings
 * @param color: string
 **/

export const setSidebarColor = (color) => async (dispatch) => {
  try {
    // add functionality to save user settings to DB
    // const response = await api.post('/api/user/settings', settings);

    dispatch({
      type: USER_ACTION_TYPES.SET_SIDEBAR_COLOR_SUCCESS,
      payload: color
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: USER_ACTION_TYPES.SET_SIDEBAR_COLOR_FAILED,
      payload: error
    });
  }
};

/** Calls financing-api to save user settings
 ** POST: "/api/user/settings
 * @param settings: object
 **/

export const setSettings = (settings) => async (dispatch) => {
  try {
    // add functionality to save user settings to DB
    // const response = await api.post('/api/user/settings', settings);

    dispatch({
      type: USER_ACTION_TYPES.SET_SETTINGS_SUCCESS,
      payload: settings
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: USER_ACTION_TYPES.SET_SETTINGS_FAILED,
      payload: error
    });
  }
};
