import React from 'react';
import { ImageBackground, StyleSheet, View,Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Sale } from './sale';
import { Rent } from './rent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import an icon library


const image = require('../../../components/other/image3.jpg');
const saleImage=require('../../../components/other/sale_image2.png');
const cartImage=require('../../../components/other/rent_image.png');
const Tab = createMaterialBottomTabNavigator();

export const Mycart = ({route}) => {
  const {email} = route.params;
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Tab.Navigator
          barStyle={{ backgroundColor: 'black' }}
          activeColor="white"
          // inactiveColor="gray"
          // shifting={true}
        >
          <Tab.Screen
            name="Sale"
            component={Sale}
            initialParams={{email}}
            options={{
              tabBarLabel: 'Sale',
              tabBarIcon: ({ color }) => (
                <Image source={saleImage} style={styles.saleimage}/>
              ),
            }}
          />
          <Tab.Screen
            name="Rent"
            component={Rent}
            initialParams={{email}}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({ color }) => (
                <Image source={cartImage} style={styles.cartimage}/>
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
  saleimage:{
    height:35,
    width:40,
    position:'absolute',
    bottom:0,
  },
  cartimage:{
    height:30,
    width:40,
    position:'absolute',
    bottom:0,
  },

});
