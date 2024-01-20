import 'react-native-gesture-handler';
import React from 'react';
import {ImageBackground, LogBox, StyleSheet, Text, View} from 'react-native';
import {Login_page} from './components/login page/login.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import {Main_page} from './components/main page/main_page.js';
import { Signup } from './components/signup.js/signup.js';


enableScreens();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center', // Align header title to center
        }}
        
        >
          <Stack.Screen
            name="Login"
            component={Login_page}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={Main_page}
            options={{headerStyle: {
              backgroundColor: '#00008B',
            },
            headerTitleStyle: {
              color: 'white', // Set the desired text color
            },}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerStyle: {
              backgroundColor: '#00008B',
            },
            headerTitleStyle: {
              color: 'white', // Set the desired text color
            },}}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
