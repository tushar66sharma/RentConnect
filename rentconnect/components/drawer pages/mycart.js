import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
const image = require('../../components/other/image3.jpg');

export const Mycart = () => {
  return (
    <View style={styles.container}> 
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.image}></ImageBackground>
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
