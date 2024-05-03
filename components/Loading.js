import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        style={{width: 270, height: 270, zIndex: 20, marginTop: -50}}
        source={require('../assets/icon/laoding.json')}
        autoPlay
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
