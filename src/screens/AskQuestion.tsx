import React from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import selectAuthState from '../redux/auth/selector';
import { createPost } from '../redux/posts/action';
import selectPostsState from '../redux/posts/selector';

const AskQuestion = (props:any) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const submitPost = () => {
    const post = {
      title,
      content: description,
      uid: props.auth.user.uid,
      id: props.posts.posts.length,
      views: 0,
      votes: 0,
      replies: 0,
      postingTime: String(new Date()),
      userName: props.auth.user.displayName,
    };
    props.createPost(post);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <FontAwesome name="arrow-left" size={30} color="black" onPress={() => props.navigation.goBack()} />
      </View>
      <Text style={styles.headerText}>Ask Doubt</Text>
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
});

const mapStateToProps = (state: any) => ({
  auth: selectAuthState(state),
  posts: selectPostsState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createPost: bindActionCreators(createPost, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion);
