import React from 'react';
import { StyleSheet, Text, VirtualizedList } from 'react-native';
import { View } from 'react-native-animatable';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PostCard = (props: any) => {
  const { posts } = props;
  return (
    <VirtualizedList
      showsVerticalScrollIndicator={false}
      data={posts}
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
            <View style={styles.postIcon}>
              <FontAwesome name="comment" size={20} color="grey" style={styles.icon} />
              <Text>{item.votes}</Text>
            </View>
            <View style={styles.postIcon}>
              <FontAwesome name="eye" size={20} color="grey" style={styles.icon} />
              <Text>{item.votes}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
  postHeaderDetails: {
    marginLeft: 5,
    flex: 1,
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    color: 'rgba(36, 4, 4, 0.3)',
    fontFamily: 'Comfortaa-Medium',
  },
  postTime: {
    color: 'rgba(36, 4, 4, 0.3)',
    fontFamily: 'Comfortaa-Medium',
  },
  postTitle: {
    color: 'black',
    fontSize: 15,
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
});

export default PostCard;
