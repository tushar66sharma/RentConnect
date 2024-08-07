import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CustomCard} from '../cards/main_page_cards';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Search} from '../searchbar & filter/search_bar';

const image = require('../../components/other/image3.jpg');
const uploadIcon = require('../../components/other/upload_image5.png');

export const cardsData = [
  {
    name: 'Charger',
    quantity: 1,
    title: '₹500',
    content: 'Laptop charger adapter 4.5mm for HP Pavilion',
    imageSource: require('../../components/cards/assets/charger.jpg'),
    flag: true,
  },
  {
    name: 'Laptop',
    quantity: 1,
    title: '₹53,000',
    content: 'HP intel i5,11th gen',
    imageSource: require('../../components/cards/assets/laptop.jpg'),
    flag: true,
  },
  {
    name: 'Cycle',
    quantity: 1,
    title: '₹500',
    content: 'Berlin Cylce',
    imageSource: require('../../components/cards/assets/cycle.jpg'),
    flag: false,
  },
  {
    name: 'Shoes',
    quantity: 3,
    title: '₹500',
    content: 'Vomero 17 Men running shoes',
    imageSource: require('../../components/cards/assets/shoes.jpg'),
    flag: false,
  },
  {
    name: 'Book',
    quantity: 5,
    title: '₹ 335',
    content: 'Griffiths',
    imageSource: require('../../components/cards/assets/book.jpg'),
    flag: true,
  },
  {
    name: 'Medicine',
    quantity: 15,
    title: '₹ 50',
    content: 'Parcetamol 50mg',
    imageSource: require('../../components/cards/assets/medicines.jpg'),
    flag: false,
  },
  {
    name: 'Umbrella',
    quantity: 5,
    title: '₹ 150',
    content: 'Umbrella',
    imageSource: require('../../components/cards/assets/umbrella.jpg'),
    flag: true,
  },
  {
    name: 'Camera',
    quantity: 4,
    title: '₹800',
    content: 'Canon Powershot SX70 20.3MP Digital Camera 65x Optical Zoom Lens',
    imageSource: require('../../components/cards/assets/camera.jpg'),
    flag: true,
  },
  {
    name: 'Lamp',
    quantity: 4,
    title: '₹400',
    content: 'Lamp',
    imageSource: require('../../components/cards/assets/lamp.jpg'),
    flag: false,
  },
  {
    name: 'Drafter',
    quantity: 11,
    title: '₹150',
    content: 'MiniDrafter',
    imageSource: require('../../components/cards/assets/drafter.jpg'),
    flag: true,
  },
  {
    name: 'Laptop',
    quantity: 1,
    title: '₹150',
    content: 'MiniDrafter',
    imageSource: require('../../components/cards/assets/drafter.jpg'),
    flag: true,
  },
  {
    name: 'Laptop',
    quantity: 1,
    title: '₹400',
    content: 'Lamp',
    imageSource: require('../../components/cards/assets/lamp.jpg'),
    flag: true,
  },
];

export const Main_page = ({route}) => {
  const {email} = route.params;
  const navigation = useNavigation();

  const SampleFunction = () => {
    Alert.alert(`Floating Button Clicked ${email}`);
    navigation.navigate('Upload', {email});
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.searchContainer}>
          <Search />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {cardsData.map((card, index) => (
            <CustomCard
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
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={SampleFunction}
          style={styles.floatingButton}>
          <Image source={uploadIcon} style={styles.floatingButtonImage} />
        </TouchableOpacity>
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
  searchContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    // padding: 10,
    backgroundColor: '#0000cd', // Optional background for better visibility
    zIndex: 10,
    paddingBottom:10,
  },
  scrollContainer: {
    paddingTop:70,
    marginBottom: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonImage: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
    borderRadius: 35, // Make the button circular
  },
});

export default Main_page;
