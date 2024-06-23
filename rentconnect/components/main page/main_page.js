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
    title: '₹500',
    content: 'Laptop charger adapter 4.5mm for HP Pavilion',
    imageSource: require('../../components/cards/assets/charger.jpg'),
    flag: false,
  },
  {
    title: '₹53,000',
    content: 'HP intel i5,11th gen',
    imageSource: require('../../components/cards/assets/laptop.jpg'),
    flag: true,
  },
  {
    title: '₹500',
    content: 'Berlin Cylce',
    imageSource: require('../../components/cards/assets/cycle.jpg'),
    flag: false,
  },
  {
    title: '₹500',
    content: 'Vomero 17 Men running shoes',
    imageSource: require('../../components/cards/assets/shoes.jpg'),
    flag: true,
  },
  {
    title: '₹ 335',
    content: 'Griffiths',
    imageSource: require('../../components/cards/assets/book.jpg'),
    flag: false,
  },
  {
    title: '₹ 50',
    content: 'Parcetamol 50mg',
    imageSource: require('../../components/cards/assets/medicines.jpg'),
    flag: true,
  },
  {
    title: '₹ 150',
    content: 'Umbrella',
    imageSource: require('../../components/cards/assets/umbrella.jpg'),
    flag: true,
  },
  {
    title: '₹800',
    content: 'Canon Powershot SX70 20.3MP Digital Camera 65x Optical Zoom Lens',
    imageSource: require('../../components/cards/assets/camera.jpg'),
    flag: false,
  },
  {
    title: '₹400',
    content: 'Lamp',
    imageSource: require('../../components/cards/assets/lamp.jpg'),
    flag: false,
  },
  {
    title: '₹150',
    content: 'MiniDrafter',
    imageSource: require('../../components/cards/assets/drafter.jpg'),
    flag: true,
  },
  {
    title: '₹150',
    content: 'MiniDrafter',
    imageSource: require('../../components/cards/assets/drafter.jpg'),
    flag: true,
  },
  {
    title: '₹400',
    content: 'Lamp',
    imageSource: require('../../components/cards/assets/lamp.jpg'),
    flag: false,
  },
];

export const Main_page = ({route}) => {
  const {email} = route.params;
  const navigation = useNavigation();

  SampleFunction = () => {
    // Write your own code here, Which you want to execute on Floating Button Click Event.
    Alert.alert(`Floating Button Clicked ${email}`);
    navigation.navigate('Upload', {email});
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
          
          <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Search />
            {cardsData.map((card, index) => (
              <CustomCard
                key={index}
                title={card.title}
                content={card.content}
                imageSource={card.imageSource}
                flag={card.flag}
                email={email}
              />
            ))}
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.SampleFunction}
            style={styles.TouchableOpacityStyle}>
            <Image source={uploadIcon} style={styles.FloatingButtonStyle} />
          </TouchableOpacity>
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
