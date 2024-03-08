import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';
import { CustomCard1 } from '../../cards/mycart_sales_cards';

const image = require('../../../components/other/image3.jpg');

export const cardsData = [
  {
    title: '₹500',
    content: 'Laptop charger adapter 4.5mm for HP Pavilion',
    imageSource: require('../../../components/cards/assets/charger.jpg'),
  },
  {
    title: '₹53,000',
    content: 'HP intel i5,11th gen',
    imageSource: require('../../../components/cards/assets/laptop.jpg'),
  },
  {
    title: '₹500',
    content: 'Berlin Cylce',
    imageSource: require('../../../components/cards/assets/cycle.jpg'),
  },
  {
    title: '₹500',
    content: 'Vomero 17 Men running shoes',
    imageSource: require('../../../components/cards/assets/shoes.jpg'),
  },
  {
    title: '₹ 335',
    content: 'Griffiths',
    imageSource: require('../../../components/cards/assets/book.jpg'),
  },
  {
    title: '₹ 50',
    content: 'Parcetamol 50mg',
    imageSource: require('../../../components/cards/assets/medicines.jpg'),
  },
  {
    title: '₹ 150',
    content: 'Umbrella',
    imageSource: require('../../../components/cards/assets/umbrella.jpg'),
  },
  {
    title: '₹800',
    content: 'Canon Powershot SX70 20.3MP Digital Camera 65x Optical Zoom Lens',
    imageSource: require('../../../components/cards/assets/camera.jpg'),
  },
  {
    title: '₹400',
    content: 'Lamp',
    imageSource: require('../../../components/cards/assets/lamp.jpg'),
  },
  {
    title: '₹150',
    content: 'MiniDrafter',
    imageSource: require('../../../components/cards/assets/drafter.jpg'),
  },
  {
    title: '₹150',
    content: 'MiniDrafter',
    imageSource: require('../../../components/cards/assets/drafter.jpg'),
  },
  {
    title: '₹400',
    content: 'Lamp',
    imageSource: require('../../../components/cards/assets/lamp.jpg'),
  },
];
export const Sale = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.row}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {cardsData.map((card, index) => (
              <CustomCard1
                key={index}
                title={card.title}
                content={card.content}
                imageSource={card.imageSource}
              />
            ))}
          </ScrollView>
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
  whiteBox: {
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    width: '95%',
    maxWidth: 600,
    // maxHeight:'80%',
    marginBottom: 50,
    flex: 1,
    opacity: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    // flexWrap:'wrap',
    // width: '100%',
    //padding: 6,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
