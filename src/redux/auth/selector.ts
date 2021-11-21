import { createSelector } from 'reselect';

const selectState = (state: any) => state.auth;
const selectAuthState = createSelector([selectState], (auth) => auth);

export default selectAuthState;
