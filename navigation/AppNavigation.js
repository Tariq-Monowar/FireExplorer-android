import 'react-native-gesture-handler';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking
} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import FireStoreScreen from '../screens/FireStoreScreen';
import RealTimeDatabase from '../screens/RealTimeDatabase';

import FireStorePostDetails from '../screens/FireStorePostDetails';
import RealTimePostDetails from '../screens/RealTimePostDetails';

const tabWidth = Dimensions.get('window').width / 2;

const Tab = createMaterialTopTabNavigator();
const TabNavigation = () => {
  return (
    <>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      {/* <SafeAreaView></SafeAreaView> */}
      <Tab.Navigator
        screenOptions={{
          // tabBarStyle: {
          //   backgroundColor: '#f7ffff',
          // },
          //   tabBarActiveTintColor: '#0b958c', //active
          //   tabBarInactiveTintColor: '#00000061', //InActive
          tabBarIndicatorStyle: {
            backgroundColor: '#0b958c',
          },
          //   tabBarLabelStyle: {
          //       // Adjust font size as needed
          //   },
          tabBarLabelPosition: 'beside-icon',
        }}>
        <Tab.Screen
          name="firestore"
          component={FireStoreScreen}
          options={{
            // tabBarLabel: '', // fot tab default lable
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    width: 110,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}>
                  Cloud Firestore
                </Text>
                <Image
                  style={{width: 22, height: 22, opacity: 0.7}}
                  source={require('../assets/tab1-logo.png')}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="realtimedatabase"
          component={RealTimeDatabase}
          options={{
            // tabBarLabel: 'Realtime Database'
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    width: 135,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}>
                  Realtime Database
                </Text>
                <Image
                  style={{width: 22, height: 22, opacity: 0.7}}
                  source={require('../assets/tab2-logo.png')}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="firestores"
              component={TabNavigation}
              options={{
                headerTitle: 'FireExplorer',
                headerStyle: {
                  backgroundColor: '#0b958c',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: 23,
                },
                headerRight: () => (
                  <TouchableOpacity onPress={async ()=> await Linking.openURL("https://rnfirebase.io/")}>
                    <Image
                      style={{width: 32, height: 32}}
                      source={require('../assets/app-logo.png')}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="FireStorePostDetails" component={FireStorePostDetails} options={{headerShown:  false}}/>
            <Stack.Screen name="RealTimePostDetails" component={RealTimePostDetails} options={{headerShown:  false}}/>
         
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});

// screenOptions={{
//   tabBarStyle: {
//     backgroundColor: '#15a198',
//   },
//   tabBarActiveTintColor: '#fff',
//   tabBarInactiveTintColor: '#ccc',
//   tabBarIndicatorStyle: {
//     backgroundColor: '#fff',
//   },
// }}
