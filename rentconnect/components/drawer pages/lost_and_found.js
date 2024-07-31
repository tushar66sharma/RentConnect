import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { CustomCard3 } from '../cards/lost_and_found_cards';
import {TouchableOpacity} from 'react-native-gesture-handler';


const image = require('../../components/other/image3.jpg');

export const cardsData = [
  {
    name:'Laptop Charger',
    quantity:1,
    title: '₹500',
    content: 'Laptop charger adapter 4.5mm for HP Pavilion',
    imageSource: require('../../components/cards/assets/charger.jpg'),
    flag: false,
  },
  {
    name:'Laptop',
    quantity:1,
    title: '₹53,000',
    content: 'HP intel i5,11th gen',
    imageSource: require('../../components/cards/assets/laptop.jpg'),
    flag: true,
  },
  {
    name:'Cycle',
    quantity:1,
    title: '₹500',
    content: 'Berlin Cylce',
    imageSource: require('../../components/cards/assets/cycle.jpg'),
    flag: true,
  },
  {
    name:'Shoes',
    quantity:2,
    title: '₹500',
    content: 'Vomero 17 Men running shoes',
    imageSource: require('../../components/cards/assets/shoes.jpg'),
    flag: true,
  },
  {
    name:'Book',
    quantity:5,
    title: '₹ 335',
    content: 'Griffiths',
    imageSource: require('../../components/cards/assets/book.jpg'),
    flag: false,
  },
  {
    name:'Medicine',
    quantity:15,
    title: '₹ 50',
    content: 'Parcetamol 50mg',
    imageSource: require('../../components/cards/assets/medicines.jpg'),
    flag: true,
  },
  {
    name:'Umbrella',
    quantity:2,
    title: '₹ 150',
    content: 'Umbrella',
    imageSource: require('../../components/cards/assets/umbrella.jpg'),
    flag: true,
  },
  {
    name:'Camera',
    quantity:1,
    title: '₹800',
    content: 'Canon Powershot SX70 20.3MP Digital Camera 65x Optical Zoom Lens Canon Powershot SX70 20.3MP Digital Camera 65x Optical Zoom Lens hello world have llm ',
    imageSource: require('../../components/cards/assets/camera.jpg'),
    flag: true,
  },
  {
    name:'Study Lamp',
    quantity:4,
    title: '₹400',
    content: 'Lamp',
    imageSource: require('../../components/cards/assets/lamp.jpg'),
    flag: false,
  },
  {
    name:'Drater',
    quantity:5,
    title: '₹150',
    content: 'MiniDrafter',
    imageSource: require('../../components/cards/assets/drafter.jpg'),
    flag: true,
  },
  {
    name:'drafter',
    quantity:1,
    title: '₹150',
    content: 'MiniDrafter',
    imageSource: require('../../components/cards/assets/drafter.jpg'),
    flag: true,
  },
  {
    name:'laptop',
    quantity:1,
    title: '₹400',
    content: 'Lamp',
    imageSource: require('../../components/cards/assets/lamp.jpg'),
    flag: true,
  },
];



export const Lost_and_Found = ({route}) => {
  const {email} = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
            {cardsData.map((card, index) => (
              <CustomCard3
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
    // marginBottom:0,
  },
  searchcontainer: {
    marginTop: 0,
    marginBottom: 5,
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
  scrollContainer: {
    marginTop: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
