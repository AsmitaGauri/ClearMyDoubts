import { SET_TEXT, DELETE_TEXT } from './types';

const setText = (text: string) => ({
  type: SET_TEXT,
  payload: text,
});

const deleteText = () => ({
  type: DELETE_TEXT,
});

export { setText, deleteText };
