import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './actionTypes';

const initialState = {
  isRegistering: false,
  user: {},
  isLoggedIn: false,
  error: null,
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
    default:
      return state;
  }
};

export default authReducer;
