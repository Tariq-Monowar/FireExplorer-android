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
import CreateRealtimeData from '../components/CreateRealtimeData';
import Loading from '../components/Loading';
import { UseRealtimeContext } from '../context/RealtimeDtabaseContext';
import RealTimeScrollField from '../components/RealTimeScrollField';

const RealTimeDatabase = () => {
  const RealtimeContext = UseRealtimeContext()
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

  return (
    <View style={styles.screenContainer}>
      {RealtimeContext.uploadeLoading && <Loading />}
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
        <RealTimeScrollField />
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
            <CreateRealtimeData onClose={handleClosePress}/>
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </View>
  );
};

export default RealTimeDatabase;

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
