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

const addReply = (reply: any) => () => {
  firestore.collection('posts').where('id', '==', reply.postID).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // eslint-disable-next-line
        var post = doc.data();
        // eslint-disable-next-line
        var comments = post.comments ?? [];
        comments.push(reply);
        firestore.collection('posts').doc(doc.id).set({
          ...doc.data(),
          comments,
        });
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export { fetchAllPosts, createAPost, addReply };
