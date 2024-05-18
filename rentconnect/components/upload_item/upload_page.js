import React from 'react';
import {ImageBackground, StyleSheet, Text, View,Image} from 'react-native';
const image = require('../../components/other/image3.jpg');

export const Upload = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.innerbox1}>
          <Text style={styles.text}>Uplaod Item Screen</Text>
          {/* <Image source={image} style={styles.searchimage} /> */}
        </View>
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
  innerbox1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
  searchimage:{
    
    height:35,
    width:40,
    position:'absolute',
    left:25,
    top:25,
    backgroundColor:'white',
}
});
