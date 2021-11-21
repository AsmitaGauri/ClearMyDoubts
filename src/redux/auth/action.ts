import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
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

export {
  registrationRequested,
  registrationSuccessful,
  registrationFailed,
};
