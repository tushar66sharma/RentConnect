import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import { Settings } from '../drawer pages/setting';
import { Notification } from '../drawer pages/notifications';
import { Mycart } from '../drawer pages/mycart';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const image = require('../../components/other/image3.jpg');

export const Main_page = () => {
  return (
    <View style={styles.container}>
      
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>



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
