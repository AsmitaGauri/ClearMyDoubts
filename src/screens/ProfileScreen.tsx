import React from 'react';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ScrollView } from 'react-native-gesture-handler';
import selectPostsState from '../redux/posts/selector';
import selectAuthState from '../redux/auth/selector';
import PostCard from './PostCard';
import { logout } from '../redux/auth/service';

const ProfileScreen = (props:any) => {
  const { auth, navigation, route } = props;
  const [userPosts, setUserPosts] = React.useState([]);
  React.useEffect(() => {
    // eslint-disable-next-line
    var currUserPosts = [];
    currUserPosts = props.posts.posts.filter((post:any) => post.uid === auth.user.uid);
    setUserPosts(currUserPosts);
  }, []);

  const handleLogout = () => {
    props.logout();
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="arrow-left" size={30} color="white" onPress={() => props.navigation.goBack()} />
          <View style={styles.avatar}>
            <Avatar
              rounded
              icon={{
                name: 'user', type: 'font-awesome', color: 'white', size: 35,
              }}
            />
          </View>
          <View style={styles.logout}>
            <Button title="Logout" onPress={handleLogout} color="grey" />
          </View>
          <Text style={styles.userName}>{route.params}</Text>
          <View style={styles.postDetails}>
            <View style={styles.postCount}>
              <Text style={styles.postStats}>24</Text>
              <Text style={styles.postStats}>Posts</Text>
            </View>
            <View style={{ ...styles.postCount, ...styles.voteCont }}>
              <Text style={styles.postStats}>120</Text>
              <Text style={styles.postStats}>Votes</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.recentPostsHeading}>Recent Posts</Text>
          {userPosts.length
            ? <PostCard posts={userPosts} navigation={navigation} /> : <Text>No Recent Posts</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
  },
  container: {
    fontFamily: 'Comfortaa-Medium',
    flexGrow: 1,
    backgroundColor: '#000',
  },
  footer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'Comfortaa-Medium',
  },
  avatar: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'white',
    width: 77,
    padding: 20,
    borderRadius: 40,
    marginBottom: 10,
  },
  postCount: {
    backgroundColor: '#DADADA',
    width: '50%',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  voteCont: {
    borderLeftWidth: 1,
  },
  postDetails: {
    display: 'flex',
    flexDirection: 'row',
  },
  postStats: {
    color: 'black',
    fontSize: 19,
    fontFamily: 'Comfortaa-Medium',
  },
  recentPostsHeading: {
    fontSize: 18,
    fontFamily: 'Comfortaa-Medium',
    marginBottom: 20,
  },
  logout: {
    width: 150,
  },
});

const mapStateToProps = (state: any) => ({
  posts: selectPostsState(state),
  auth: selectAuthState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: bindActionCreators(logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
