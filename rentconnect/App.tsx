import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Login_page} from './components/login page/login.js';
import {Main_page} from './components/main page/main_page.js';
import {Signup} from './components/signup.js/signup.js';
import {Settings} from './components/drawer pages/setting.js';
import {Mycart} from './components/drawer pages/mycart/mycart.js';
import {Notification} from './components/drawer pages/notifications.js';
import {Upload} from './components/upload_item/upload_page.js';
import {OrderDetails_Page} from './components/order page/order_details.js';
import {Lost_and_Found_Details_Page} from './components/lost_and_found_details/lost_and_found_details.js';
import {Lost_and_Found} from './components/drawer pages/lost_and_found.js';
//import { FilterPage } from './components/searchbar & filter/filterpage.js';

const Drawer = createDrawerNavigator();
enableScreens();
const Stack = createNativeStackNavigator();

export function Root({route}: any) {
  const {email} = route.params;
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0000cd',
        },
        headerTitleStyle: {
          fontSize: 25,
        },
        headerTitleAlign: 'center', // Align header title to center
      }}>
      <Drawer.Screen
        name="Main_page"
        component={Main_page}
        initialParams={{email}} //passing the email as prop to the main_page
        options={{
          headerStyle: {
            backgroundColor: '#0000cd',
          },
          headerTitleStyle: {
            color: 'white', // Set the desired text color
          },
        }}
      />
      <Drawer.Screen
        name="Mycart"
        component={Mycart}
        initialParams={{email}}
        options={{
          headerStyle: {
            backgroundColor: '#0000cd',
          },
          headerTitleStyle: {
            color: 'white', // Set the desired text color
          },
        }}
      />
      <Drawer.Screen
        name="Lost and Found"
        component={Lost_and_Found}
        initialParams={{email}}
        options={{
          headerStyle: {
            backgroundColor: '#0000cd',
          },
          headerTitleStyle: {
            color: 'white', // Set the desired text color
          },
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        initialParams={{email}}
        options={{
          headerStyle: {
            backgroundColor: '#0000cd',
          },
          headerTitleStyle: {
            color: 'white', // Set the desired text color
          },
        }}
      />
    </Drawer.Navigator>
  );
}

function App(): React.JSX.Element {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    fetchEmail();
  }, []);

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
          }}>
          <Stack.Screen
            name="Login"
            component={Login_page}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Root"
            component={Root}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#0000cd',
              },
              headerTitleStyle: {
                color: 'white', // Set the desired text color
              },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerStyle: {
                backgroundColor: '#0000cd',
              },
              headerTitleStyle: {
                color: 'white', // Set the desired text color
              },
            }}
          />
          <Stack.Screen
            name="OrderDetails_Page"
            component={OrderDetails_Page}
            options={{
              headerStyle: {
                backgroundColor: '#0000cd',
              },
              headerTitleStyle: {
                color: 'white', // Set the desired text color
              },
            }}
          />
          <Stack.Screen
            name="Lost and Found Details"
            component={Lost_and_Found_Details_Page}
            options={{
              headerStyle: {
                backgroundColor: '#0000cd',
              },
              headerTitleStyle: {
                color: 'white', // Set the desired text color
              },
            }}
          />
          <Stack.Screen
            name="Upload"
            component={Upload}
            options={{
              headerStyle: {
                backgroundColor: '#0000cd',
              },
              headerTitleStyle: {
                color: 'white', // Set the desired text color
              },
            }}
          />
          {/* <Stack.Screen
            name="Filters"
            component={FilterPage}
            options={{
              headerStyle: {
                backgroundColor: '#0000cd',
              },
              headerTitleStyle: {
                color: 'white', // Set the desired text color
              },
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
