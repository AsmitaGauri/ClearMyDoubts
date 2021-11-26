import { Dispatch } from 'redux';
import { Firestore as firestore } from '../../../config/Firebase';
import { Post } from '../../interfaces';
import { fetchPosts, createPost } from './action';

const fetchAllPosts = () => (dispatch: Dispatch) => {
  firestore.collection('posts').onSnapshot((querySnapshot) => {
    const posts:any = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    dispatch(fetchPosts(posts));
  });
};

const createAPost = (post : Post, length: number) => (dispatch: Dispatch) => {
  firestore.collection('posts').add({
    ...post,
    id: length + 1,
  })
    .then((resp) => {
      dispatch(createPost(resp));
    });
};

export { fetchAllPosts, createAPost };
