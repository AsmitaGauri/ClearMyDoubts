import React from 'react';
import {
  StyleSheet, Text, TextInput, View, VirtualizedList,
} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Firestore } from '../../config/Firebase';
import selectAuthState from '../redux/auth/selector';
import { addReply } from '../redux/posts/service';

const PostDetails = (props:any) => {
  const { route, auth } = props;
  const post = route.params;
  const [comments, setComments] = React.useState([]);
  const [userName, setUserName] = React.useState('');
  const [replyMessage, setReplyMessage] = React.useState('');

  React.useEffect(() => {
    if (auth.user.displayName === null) {
      Firestore.collection('users').where('uid', '==', auth.user.uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUserName(doc.data().userName);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    Firestore.collection('posts').where('id', '==', post.id)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          Firestore.collection('posts').doc(doc.id).get()
            .then((resp) => {
              // eslint-disable-next-line
              setComments(resp.data().comments);
            })
            .catch((err) => console.log(err.message));
        });
      });
  }, []);

  const sendReply = () => {
    const reply = {
      postID: post.id,
      userName,
      id: post.comments?.length ? post.comments.length + 1 : 0,
      reply: replyMessage,
      postingTime: String(new Date()),
    };
    props.addReply(reply);
    setReplyMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <FontAwesome name="arrow-left" size={30} color="white" onPress={() => props.navigation.goBack()} />
        <Text style={styles.headerText}>View Post</Text>
      </View>
      <View style={styles.postBox}>
        <View style={styles.postHeader}>
          <Avatar
            rounded
            icon={{
              name: 'user', type: 'font-awesome', color: 'black', size: 35,
            }}
          />
          <View style={styles.postHeaderDetails}>

            <View style={styles.userDetails}>
              <Text style={styles.userName}>{post.userName}</Text>
              <Text style={styles.postTime}>{`${(new Date(post.postingTime)).getHours()}:${(new Date(post.postingTime)).getMinutes()}`}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text>{post.content}</Text>
        </View>
      </View>
      <View style={styles.replies}>
        <Text style={styles.replyHeading}>Replies</Text>
        {/* {item.comments.length ? ( */}
        <VirtualizedList
          showsVerticalScrollIndicator={false}
          data={comments}
          keyExtractor={(item:any) => item.id}
          getItem={(data, index) => data[index]}
          getItemCount={(data: any) => data?.length}
          renderItem={({ item }) => (
            <View style={styles.replyBox}>
              <View style={styles.postHeader}>
                <Avatar
                  rounded
                  icon={{
                    name: 'user', type: 'font-awesome', color: 'black', size: 35,
                  }}
                />
                <View style={styles.postHeaderDetails}>

                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <Text style={styles.postTime}>{`${(new Date(item.postingTime)).getHours()}:${(new Date(item.postingTime)).getMinutes()}`}</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text>{item.reply}</Text>
              </View>
            </View>
          )}
        />
        {/* ) */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Message"
            placeholderTextColor="#A9A9A9"
            style={styles.input}
            value={replyMessage}
            onChangeText={(val) => setReplyMessage(val)}
          />
          <Icon
            name="arrow-circle-right"
            type="font-awesome"
            color="white"
            onPress={sendReply}
            size={40}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Comfortaa-Medium',
    flexGrow: 1,
    backgroundColor: '#000',
  },
  replies: {
    flex: 1,
  },
  backArrow: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    marginLeft: 30,
    color: 'white',
  },
  postBox: {
    maxHeight: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    padding: 15,
    marginTop: 50,
    marginHorizontal: 20,
  },
  replyBox: {
    maxHeight: '100%',
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    marginHorizontal: 20,
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  postHeaderDetails: {
    marginLeft: 10,
    flex: 1,
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    color: 'black',
    fontFamily: 'Comfortaa-Medium',
  },
  postTime: {
    color: 'rgba(36, 4, 4, 0.3)',
    fontFamily: 'Comfortaa-Medium',
  },
  postTitle: {
    color: 'black',
    fontSize: 15,
    marginBottom: 10,
    fontFamily: 'Comfortaa-Bold',
  },
  postStatistics: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  postIcon: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
  replyHeading: {
    color: 'white',
    marginLeft: 20,
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Comfortaa-Medium',
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    marginRight: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    fontSize: 18,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 25,
    flex: 1,
    color: 'black',
    marginRight: 10,
  },
});

const mapStateToProps = (state: any) => ({
  auth: selectAuthState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addReply: bindActionCreators(addReply, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
