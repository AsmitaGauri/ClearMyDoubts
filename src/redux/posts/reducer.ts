import { FETCH_POSTS, CREATE_POST } from './actionTypes';
import { Post } from '../../interfaces';

const initialState = {
  posts: <Post[]>{},
};

const postReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload };
    case CREATE_POST:
    // eslint-disable-next-line
      var newPosts= state.posts;
      newPosts.push(action.payload);
      console.log(action.payload);
      return { ...state, posts: newPosts };
    default:
      return state;
  }
};

export default postReducer;
