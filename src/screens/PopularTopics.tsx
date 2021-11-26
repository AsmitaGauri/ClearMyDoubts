import React from 'react';
import { StyleSheet, VirtualizedList } from 'react-native';
import { View, Text } from 'react-native-animatable';

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

const PopularTopics = () => (
  <>
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
  </>
);

const styles = StyleSheet.create({
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
});

export default PopularTopics;
