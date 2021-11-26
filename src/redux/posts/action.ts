import { FETCH_POSTS, CREATE_POST } from './actionTypes';

const fetchPosts = (posts: any) => ({
  type: FETCH_POSTS,
  payload: posts,
});

const createPost = (post: any) => ({
  type: CREATE_POST,
  payload: post,
});

export { createPost, fetchPosts };
