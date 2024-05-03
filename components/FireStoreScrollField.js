import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UseFireStoreContext} from '../context/FireStoreContext';

const FireStoreScrollField = () => {
  const navigation = useNavigation();
  const {findData, findDataLoading} = UseFireStoreContext();

  const truncateDescription = description => {
    const words = description.split(' ');
    if (words.length > 6) {
      return words.slice(0, 6).join(' ') + '...';
    } else {
      return description;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {findData?.map(post => {
        return (
          <TouchableOpacity
            key={post.id}
            style={styles.postContainer}
            onPress={()=>navigation.navigate('FireStorePostDetails', post)}>

            <View style={styles.postContent}>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.description}>
                {truncateDescription(post.description)}
              </Text>
            </View>
            <Image source={{uri: post.image}} style={styles.postImage} />

          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FireStoreScrollField;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  postContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#ededee',
    borderRadius: 10,
    shadowColor: '#575757',
    height: 100,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  postContent: {
    flex: 1,
    paddingLeft: 7,

    paddingTop: 5,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
    lineHeight: 25,
    fontFamily: 'Signika-Bold',
    color: '#595959',
  },
  description: {
    fontSize: 16,
    // paddingRight: 5,
    marginTop: -5,
    opacity: 0.8,
  },
  postImage: {
    width: 100,
    opacity: 0.9,
    height: 100,
    borderRadius: 10,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10
  },
});
