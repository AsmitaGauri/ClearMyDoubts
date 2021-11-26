import { createSelector } from 'reselect';

const selectState = (state: any) => state.posts;
const selectPostsState = createSelector([selectState], (posts) => posts);

export default selectPostsState;
