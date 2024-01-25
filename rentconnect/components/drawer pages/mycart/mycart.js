import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Sale } from './sale';
import { Rent } from './rent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import an icon library

const image = require('../../../components/other/image3.jpg');
const Tab = createMaterialBottomTabNavigator();

export const Mycart = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Tab.Navigator
          barStyle={{ backgroundColor: 'black' }}
          activeColor="white"
          inactiveColor="gray"
          shifting={true}
        >
          <Tab.Screen
            name="Sale"
            component={Sale}
            options={{
              tabBarLabel: 'Sale',
              tabBarIcon: ({ color }) => (
                <Icon name="sale" color={color} size={18} />
              ),
            }}
          />
          <Tab.Screen
            name="Rent"
            component={Rent}
            options={{
              tabBarLabel: 'Rent',
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={18} />
              ),
            }}
          />
        </Tab.Navigator>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});
