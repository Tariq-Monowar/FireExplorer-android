import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {
  ChevronLeftIcon,
  PencilIcon,
  TrashIcon,
} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import {UseFireStoreContext} from '../context/FireStoreContext';
import Loading from '../components/Loading';
import CreateFireStorage from '../components/CreateFireStorage';


const FireStorePostDetails = ({route}) => {
  const firestoreContext = UseFireStoreContext();

  const navigate = useNavigation();

  const post = route?.params;
  
  console.log(post)
  //bottom shit.................................
  const snapPoints = useMemo(() => ['88%']);
  const bottomSheetRef = useRef(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(-1);
  console.log(buttonStyle);

  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleOpenPress = () => {
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
  };

  //..............................................

  const handleUpdtedData = (updateImage, title, description) => {
    console.log('hi', updateImage, title, description);
    if (title) {
      post.title = title;
    }
    if (description) {
      post.description = description;
    }
    if (updateImage) {
      post.image = updateImage;
    }
  };

  const deletePost = async () => {
    try {
      const res = await firestoreContext.deletePost(post.id, post.image);
      if (res) {
        navigate.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deletePost();
          },
        },
      ],
      {cancelable: false},
    );
  };


  return (
    <>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      {firestoreContext.findDataLoading && <Loading />}
      <ScrollView>
        <View
          style={{...styles.headerView, marginTop: StatusBar.currentHeight}}>
          <TouchableOpacity
            onPress={() => navigate.goBack()}
            style={{...styles.backBtn, ...styles.shadowProp}}>
            <ChevronLeftIcon size={30} strokeWidth={2.5} color="#102426" />
          </TouchableOpacity>
          <Text style={styles.dayName}>Post</Text>
        </View>

        <View style={{marginHorizontal: 10}}>
          <Image source={{uri: post.image}} style={styles.postImage} />
        </View>

        <View style={styles.controlPostContainer}>
          <TouchableOpacity
            onPress={handleOpenPress}
            style={{...styles.deleteButton, ...styles.shadowProp}}>
            <PencilIcon size={30} strokeWidth={2.5} color="#ababab" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={{...styles.deleteButton, ...styles.shadowProp}}>
            <TrashIcon size={30} strokeWidth={2.5} color="#ababab" />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 25,
            marginHorizontal: 10,
            lineHeight: 31,
            marginTop: 15,
            fontFamily: 'Signika-Bold',
            selectable: true,
          }}>
          {post.title}
        </Text>
        <Text
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            fontSize: 17,
            lineHeight: 24,
            marginBottom: 50,
            selectable: true,
          }}>
          {post.description}
        </Text>
      </ScrollView>

      {isBottomSheetVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          initialSnapIndex={0}
          handleIndicatorStyle={{
            backgroundColor: '#0b958c',
            width: 100,
          }}
          backgroundStyle={{backgroundColor: '#FFF'}}
          onChange={index => setButtonStyle(index)}>
          <BottomSheetScrollView>
            <CreateFireStorage
              onClose={handleClosePress}
              onData={post}
              onUpdtedData={handleUpdtedData}
            />
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </>
  );
};

export default FireStorePostDetails;

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: 3,
  },
  backBtn: {
    borderRadius: 20,
    padding: 8,
    backgroundColor: '#ededee',
    width: 50,
    marginLeft: 10,
    position: 'relative',
    zIndex: 3,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  dayName: {
    flex: 1,
    fontSize: 25,
    marginTop: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    // color: "#002f34",
    zIndex: 0,
    position: 'absolute',
    width: '100%',
  },
  postImage: {
    width: '100%', // To fill the width of the container
    height: 250,
    borderRadius: 10,
    marginTop: 15,
  },
  controlPostContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
    marginTop: 15,
    marginBottom: -5,
  },
  deleteButton: {
    borderRadius: 10,
    padding: 9,
    backgroundColor: '#ededee',
    width: 50,
    marginLeft: 10,
    zIndex: 3,
    marginLeft: 20,
  },
});
