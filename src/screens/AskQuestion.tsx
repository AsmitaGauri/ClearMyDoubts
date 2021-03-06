import React from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import selectAuthState from '../redux/auth/selector';
import selectPostsState from '../redux/posts/selector';
import { createAPost } from '../redux/posts/service';

const AskQuestion = (props:any) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState('');
  const submitPost = () => {
    if (title === '' || description === '') {
      setError('Please fill all details');
    } else {
      const post = {
        title,
        content: description,
        uid: props.auth.user.uid,
        id: props.posts.posts.length + 1,
        views: 0,
        votes: 0,
        replies: 0,
        postingTime: String(new Date()),
        userName: props.route.params,
      };
      props.createAPost(post);
      props.navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <FontAwesome name="arrow-left" size={30} color="black" onPress={() => props.navigation.goBack()} />
      </View>
      <Text style={styles.headerText}>Ask Doubt</Text>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.form}>
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Title</Text>
          <TextInput style={styles.input} onChangeText={(val) => setTitle(val)} />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Description</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={5}
            onChangeText={(descp) => setDescription(descp)}
          />
        </View>
        {/* <View style={styles.inputBox}>
        <Text style={styles.inputTitle}>Add Tags</Text>
      </View> */}
        <View style={styles.inputBox}>
          <Button title="Submit" color="black" onPress={submitPost} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Comfortaa-Medium',
    flexGrow: 1,
    backgroundColor: 'white',
  },
  backArrow: {
    padding: 10,
  },
  headerText: {
    color: 'black',
    marginLeft: 15,
    fontSize: 30,
    marginTop: 20,
    fontFamily: 'Comfortaa-Medium',
  },
  inputFeild: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    marginBottom: '10%',
    fontFamily: 'Comfortaa-Medium',
  },
  inputBox: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
  },
  inputTitle: {
    color: 'black',
    marginBottom: 8,
    fontSize: 18,
    fontFamily: 'Comfortaa-Medium',
  },
  form: {
    marginTop: '20%',
    padding: 10,
  },
  error: {
    color: 'red',
    fontFamily: 'Comfortaa-Medium',
    marginLeft: 20,
    marginTop: 10,
    fontSize: 18,
  },
});

const mapStateToProps = (state: any) => ({
  auth: selectAuthState(state),
  posts: selectPostsState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createAPost: bindActionCreators(createAPost, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion);
