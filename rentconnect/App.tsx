import 'react-native-gesture-handler';
import React from 'react';
import {ImageBackground, LogBox, StyleSheet, Text, View} from 'react-native';
import {Login_page} from './components/login page/login.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import {Main_page} from './components/main page/main_page.js';

enableScreens();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login_page}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={Main_page}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
