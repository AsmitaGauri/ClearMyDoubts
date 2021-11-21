import { User } from '../../interfaces';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
} from './actionTypes';

const initialState = {
  isRegistering: false,
  isLoggingIn: false,
  user: <User>{},
  isLoggedIn: false,
  error: <Error>{},
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state, isRegistering: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state, user: action.payload, isLoggedIn: true, isRegistering: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state, error: action.payload, isRegistering: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state, isLoggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state, user: action.payload, isLoggedIn: true, isLoggingIn: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state, error: action.payload, isLoggingIn: false,
      };
    case LOGOUT:
      return {
        ...state, isRegistering: false, isLoggingIn: false, user: {}, isLoggedIn: false, error: {},
      };
    default:
      return state;
  }
};

export default authReducer;
