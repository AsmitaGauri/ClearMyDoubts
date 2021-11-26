import React from 'react';
import {
  TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet, View, Text, VirtualizedList,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchAllPosts } from '../redux/posts/service';
import selectPostsState from '../redux/posts/selector';

const popularTags = [
  {
    tagName: 'C++',
    id: 1,
    color: '#229DB8',
    postCount: 5,
  },
  {
    tagName: 'Java',
    id: 2,
    color: '#4AC29A',
    postCount: 4,
  },
  {
    tagName: 'Python',
    id: 3,
    color: '#D66D75',
    postCount: 3,
  },
];

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
  const { posts } = props;
  React.useEffect(() => {
    props.fetchAllPosts();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              icon={{
                name: 'user', type: 'font-awesome', color: 'black', size: 35,
              }}
            />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Hi, Asmita</Text>
            <Text style={styles.subHeaderText}>Get all your doubts cleared!</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.popularHeading}>Poupular Topics</Text>
            <View style={styles.popularSection}>
              <VirtualizedList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={popularTags}
                keyExtractor={(item:any) => item.id}
                getItem={(data, index) => data[index]}
                getItemCount={(data: any) => data.length}
                renderItem={({ item }) => (
                  <View style={{ ...styles.popularTopics, backgroundColor: item.color }}>
                    <Text style={styles.tag}>{item.tagName}</Text>
                  </View>
                )}
              />
            </View>

            <Text style={styles.popularHeading}>Recent Posts</Text>
            <View>
              {posts.posts?.length ? (
                <VirtualizedList
                  showsVerticalScrollIndicator={false}
                  data={posts.posts}
                  keyExtractor={(item:any) => item.id}
                  getItem={(data, index) => data[index]}
                  getItemCount={(data: any) => data.length}
                  renderItem={({ item }) => (
                    <View style={styles.postBox}>
                      <View style={styles.postHeader}>
                        <Avatar
                          rounded
                          icon={{
                            name: 'user', type: 'font-awesome', color: 'black', size: 35,
                          }}
                        />
                        <View style={styles.postHeaderDetails}>
                          <Text style={styles.postTitle}>{item.title}</Text>
                          <View style={styles.userDetails}>
                            <Text style={styles.userName}>{item.userName}</Text>
                            <Text style={styles.postTime}>{`${(new Date(item.postingTime)).getHours()}:${(new Date(item.postingTime)).getMinutes()}`}</Text>
                          </View>
                        </View>
                      </View>
                      <View>
                        <Text>{item.content}</Text>
                      </View>
                      <View style={styles.postStatistics}>
                        <View style={styles.postIcon}>
                          <FontAwesome name="thumbs-up" size={20} color="grey" style={styles.icon} />
                          <Text>{item.votes}</Text>
                        </View>
                        <View style={styles.postStatistics}>
                          <FontAwesome name="comment" size={20} color="grey" style={styles.icon} />
                          <Text>{item.votes}</Text>
                        </View>
                        <View style={styles.postStatistics}>
                          <FontAwesome name="eye" size={20} color="grey" style={styles.icon} />
                          <Text>{item.votes}</Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
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
    width: 50,
    marginLeft: '80%',
  },
  popularHeading: {
    fontSize: 18,
    fontFamily: 'Comfortaa-Medium',
    marginBottom: 20,
  },
  popularSection: {
    height: 150,
    marginBottom: 20,
  },
  popularTopics: {
    // backgroundColor: '#229DB8',
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
  },
  tag: {
    color: 'white',
    display: 'flex',
    alignSelf: 'center',
    marginTop: '30%',
    fontSize: 20,
    fontFamily: 'Comfortaa-Medium',
  },
  postBox: {
    height: 140,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    padding: 8,
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  postTitle: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Comfortaa-Bold',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postHeaderDetails: {
    marginLeft: 5,
    flex: 1,
  },
  userName: {
    color: 'rgba(36, 4, 4, 0.3)',
    fontFamily: 'Comfortaa-Medium',
  },
  postTime: {
    color: 'rgba(36, 4, 4, 0.3)',
    fontFamily: 'Comfortaa-Medium',
  },
  postStatistics: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  postIcon: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

const mapStateToProps = (state: any) => ({
  posts: selectPostsState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllPosts: bindActionCreators(fetchAllPosts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
