import React, {useEffect, useState} from 'react';
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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../../components/other/image3.jpg');
const uploadIcon = require('../../components/other/upload_image5.png');

export const Main_page = ({route}) => {
  const {email} = route.params;
  const navigation = useNavigation();
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.242.172:5001/items', {
          headers: {
            Authorization: token,
          },
        });
        setCardsData(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to fetch items. Please try again.');
      }
    };

    fetchData();
  }, [email]);

  const handleUploadButtonClick = () => {
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
                title={card.price}
                content={card.description}
                imageSource={{uri: card.imageUrl}}
                flag={card.flag}
                email={email}
                name={card.name}
                quantity={card.quantity}
              />
            ))}
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleUploadButtonClick}
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
