import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigation from './navigation/AppNavigation';
import {FireStoreContextProvider} from './context/FireStoreContext';
import {RealtimeContextProvider} from './context/RealtimeDtabaseContext';

const App = () => {
  return (
    <>
      <FireStoreContextProvider>
        <RealtimeContextProvider>
          <AppNavigation />
        </RealtimeContextProvider>
      </FireStoreContextProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
