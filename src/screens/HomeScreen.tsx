import React from 'react';
import {
  TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet, View, Text, Button,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchAllPosts } from '../redux/posts/service';
import selectPostsState from '../redux/posts/selector';
import PopularTopics from './PopularTopics';
import PostCard from './PostCard';
import { Firestore } from '../../config/Firebase';
import selectAuthState from '../redux/auth/selector';

// const posts = [
//   {
//     id: 1,
//     userImage: '',
//     userName: 'Asmita Gauri',
//     title: 'How to be good in programming?',
//     postingTime: new Date(),
//     content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
//     votes: 100,
//     replies: 200,
//     views: 300,
//   },
//   {
//     id: 2,
//     userImage: '',
//     userName: 'Asmita Gauri',
//     title: 'How to be good in programming?',
//     postingTime: new Date(),
//     content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
//     votes: 100,
//     replies: 200,
//     views: 300,
//   },
//   {
//     id: 3,
//     userImage: '',
//     userName: 'Asmita Gauri',
//     title: 'How to be good in programming?',
//     postingTime: new Date(),
//     content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
//     votes: 100,
//     replies: 200,
//     views: 300,
//   },
// ];

const HomeScreen = (props:any) => {
  const { posts, auth, navigation } = props;
  const [userName, setUserName] = React.useState(auth.user.displayName ?? '');
  React.useEffect(() => {
    props.fetchAllPosts();
    if (auth.user.displayName === null) {
      Firestore.collection('users').where('uid', '==', auth.user.uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setUserName(doc.data().userName);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => props.navigation.navigate('ProfileScreen')}>
            <View style={styles.avatar}>
              <Avatar
                rounded
                icon={{
                  name: 'user', type: 'font-awesome', color: 'black', size: 35,
                }}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.headerText}>
              Hi,
              {' '}
              { userName }
            </Text>
            <Text style={styles.subHeaderText}>Get all your doubts cleared!</Text>
            <View style={styles.button}><Button title="Ask a question" color="grey" onPress={() => props.navigation.navigate('AskQuestion')} /></View>
          </View>
          <View style={styles.footer}>
            <PopularTopics />
            <Text style={styles.recentPostsHeading}>Recent Posts</Text>
            <View>
              {posts.posts?.length ? (
                <PostCard posts={posts.posts} navigation={navigation} />
              ) : <Text>No recent posts</Text>}
            </View>
            {/* <FAB style={styles.fab} /> */}
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Comfortaa-Medium',
    flexGrow: 1,
    backgroundColor: '#000',
  },
  header: {
    justifyContent: 'flex-end',
    paddingTop: 40,
    fontFamily: 'Comfortaa-Medium',
    color: 'white',
    paddingHorizontal: 30,
    paddingBottom: '10%',
    fontSize: 30,
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    paddingBottom: 8,
    fontFamily: 'Comfortaa-Medium',
  },
  subHeaderText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Comfortaa-Medium',
  },
  footer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  avatar: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    width: 45,
    marginLeft: '80%',
  },
  recentPostsHeading: {
    fontSize: 18,
    fontFamily: 'Comfortaa-Medium',
    marginBottom: 20,
  },
  button: {
    width: 150,
    marginTop: 10,
  },
});

const mapStateToProps = (state: any) => ({
  posts: selectPostsState(state),
  auth: selectAuthState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllPosts: bindActionCreators(fetchAllPosts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
