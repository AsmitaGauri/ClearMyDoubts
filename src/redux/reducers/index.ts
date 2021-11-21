import { SET_TEXT, DELETE_TEXT } from '../actions/types';

const initialState = {
  text: '',
};

const textReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TEXT:
      return { ...state, text: action.payload };
    case DELETE_TEXT:
      return { ...state, text: '' };
    default:
      return state;
  }
};

export default textReducer;
