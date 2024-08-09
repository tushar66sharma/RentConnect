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
import {CustomCard2} from '../../cards/mycart_rent_cards';
const image = require('../../../components/other/image3.jpg');

export const cardsData = [
  {
    name: 'Charger',
    quantity: 1,
    title: '₹500',
    content: 'Laptop charger adapter 4.5mm for HP Pavilion',
    imageSource: require('../../../components/cards/assets/charger.jpg'),
    flag: true,
  },
  {
    name: 'Laptop',
    quantity: 1,
    title: '₹53,000',
    content: 'HP intel i5,11th gen',
    imageSource: require('../../../components/cards/assets/laptop.jpg'),
    flag: true,
  },
  {
    name: 'Cycle',
    quantity: 1,
    title: '₹500',
    content: 'Berlin Cylce',
    imageSource: require('../../../components/cards/assets/cycle.jpg'),
    flag: false,
  },
  {
    name: 'Shoes',
    quantity: 3,
    title: '₹500',
    content: 'Vomero 17 Men running shoes',
    imageSource: require('../../../components/cards/assets/shoes.jpg'),
    flag: false,
  },
  {
    name: 'Book',
    quantity: 5,
    title: '₹ 335',
    content: 'Griffiths',
    imageSource: require('../../../components/cards/assets/book.jpg'),
    flag: true,
  },
  {
    name: 'Medicine',
    quantity: 15,
    title: '₹ 50',
    content: 'Parcetamol 50mg',
    imageSource: require('../../../components/cards/assets/medicines.jpg'),
    flag: false,
  },
  {
    name: 'Umbrella',
    quantity: 5,
    title: '₹ 150',
    content: 'Umbrella',
    imageSource: require('../../../components/cards/assets/umbrella.jpg'),
    flag: true,
  },
  {
    name: 'Camera',
    quantity: 4,
    title: '₹800',
    content: 'Canon Powershot SX70 20.3MP Digital Camera 65x Optical Zoom Lens',
    imageSource: require('../../../components/cards/assets/camera.jpg'),
    flag: true,
  },
  {
    name: 'Lamp',
    quantity: 4,
    title: '₹400',
    content: 'Lamp',
    imageSource: require('../../../components/cards/assets/lamp.jpg'),
    flag: false,
  },
  {
    name: 'Drafter',
    quantity: 11,
    title: '₹150',
    content: 'MiniDrafter',
    imageSource: require('../../../components/cards/assets/drafter.jpg'),
    flag: true,
  },
  {
    name: 'Laptop',
    quantity: 1,
    title: '₹150',
    content: 'MiniDrafter',
    imageSource: require('../../../components/cards/assets/drafter.jpg'),
    flag: true,
  },
  {
    name: 'Laptop',
    quantity: 1,
    title: '₹400',
    content: 'Lamp',
    imageSource: require('../../../components/cards/assets/lamp.jpg'),
    flag: true,
  },
];

export const Rent = ({route}) => {
  const {email} = route.params;
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.row}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {cardsData.map((card, index) => (
              <CustomCard2
                key={index}
                title={card.title}
                content={card.content}
                imageSource={card.imageSource}
                flag={card.flag}
                email={email}
                name={card.name}
                quantity={card.quantity}
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
