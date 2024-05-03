import React, {useRef, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {} from 'react-native-heroicons/solid';
import CreateFireStorage from '../components/CreateFireStorage';
import Loading from '../components/Loading';
import {UseFireStoreContext} from '../context/FireStoreContext';
import FireStoreScrollField from '../components/FireStoreScrollField';

const FireStoreScreen = () => {
  const firestoreContext = UseFireStoreContext();
  const snapPoints = useMemo(() => ['100%']);
  const bottomSheetRef = useRef(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(-1);
  console.log(buttonStyle);

  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleOpenPress = () => {
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
  };

  // console.log(handleClosePress)
  console.log(buttonStyle);
  return (
    <View style={styles.screenContainer}>
      {firestoreContext.uploadeLoading && <Loading />}
      {/* <Loading /> */}
      <TouchableOpacity
        style={{
          ...styles.addButton,
          display: buttonStyle == -1 ? 'flex' : 'none',
        }}
        onPress={handleOpenPress}>
        <Image
          style={styles.addButtonImage}
          source={require('../assets/add-data.png')}
        />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <FireStoreScrollField />
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
          <CreateFireStorage onClose={handleClosePress} />
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  addButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    zIndex: 10,
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'gray',
    elevation: 2,
  },
  addButtonImage: {
    width: 60,
    height: 60,
  },
  scrollView: {
    flex: 1,
  },
});

export default FireStoreScreen;

