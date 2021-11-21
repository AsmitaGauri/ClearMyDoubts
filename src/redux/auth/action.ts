import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGOUT,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from './actionTypes';

import { User, Error } from '../../interfaces';

const registrationRequested = () => ({
  type: REGISTER_REQUEST,
});

const registrationSuccessful = (user: User) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

const registrationFailed = (error: Error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

const loginRequested = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccessful = (user: User) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailed = (error: Error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

const logoutUser = () => ({
  type: LOGOUT,
});

export {
  registrationRequested,
  registrationSuccessful,
  registrationFailed,
  loginRequested,
  loginSuccessful,
  loginFailed,
  logoutUser,
};
