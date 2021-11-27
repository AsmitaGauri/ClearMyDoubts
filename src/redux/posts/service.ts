import { Dispatch } from 'redux';
import { Firestore as firestore } from '../../../config/Firebase';
import { fetchPosts } from './action';

const fetchAllPosts = () => (dispatch: Dispatch) => {
  firestore.collection('posts').orderBy('postingTime', 'desc').onSnapshot((querySnapshot) => {
    const posts:any = [];
    querySnapshot.forEach((doc) => {
      const { ref, ...post } = doc.data();
      posts.push(post);
    });
    dispatch(fetchPosts(posts));
  });
};

const createAPost = (post : any) => () => {
  firestore.collection('posts').add({
    ...post,
  })
    .then((resp) => {
      console.log(resp);
      // dispatch(createPost(resps));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export { fetchAllPosts, createAPost };
