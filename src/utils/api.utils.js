import axios from 'axios';
import store from 'store/store';
import { USER_ACTION_TYPES } from 'store/user/user.types';
// import { LOGOUT } from '../actions/types';

// Create an instance of axios
export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

/*
    NOTE: intercept every request and set the
    Authorization header so that all requests
    have this header.
*/

// api.interceptors.request.use(
//     (config) =>
//         (config.headers['Authorization'] = localStorage.getItem('token')
//             ? `Bearer ${localStorage.getItem('token')}`
//             : ''),
//     (error) => Promise.reject(error)
// );

/*
    NOTE: intercept any error responses from the api
    and check if the token is no longer valid.
    ie. Token has expired or user is no longer
    authenticated.
    logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // store.dispatch({ type: USER_ACTION_TYPES.SIGN_OUT });
    }
    return Promise.reject(err);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['bearer'];
    localStorage.removeItem('token');
  }
};

export const isPlaidError = (error) => {
  if (error.response && error.response.data && error.response.data.plaidError) {
    return error.response.data.plaidError;
  }
};
