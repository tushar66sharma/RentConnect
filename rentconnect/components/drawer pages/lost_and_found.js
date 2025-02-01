
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import {CustomCard3} from '../cards/lost_and_found_cards';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../../components/other/image3.jpg');

export const Lost_and_Found = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          'http://192.168.181.172:5001/lostAndFound',
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setItems(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch items');
      }
    };
    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {items.length > 0 ? (
            items.map(item => (
              <CustomCard3
                key={item._id}
                title={item.price}
                content={item.content}
                imageSource={{uri: item.imageUrl}}
                flag={item.flag}
                email={item.email}
                name={item.name}
                quantity={item.quantity}
                itemId={item._id}
              />
            ))
          ) : (
            <Text style={styles.text}>No items found</Text>
          )}
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
  text: {
    fontSize: 20,
    color: 'white',
//   TouchableOpacityStyle: {
//     position: 'absolute',
//     bottom: 40,
//     right: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 70,
//     height: 70,
//   },

//   FloatingButtonStyle: {
//     resizeMode: 'contain',
//     width: 70,
//     height: 70,
//     borderRadius: 50,
// >>>>>>> main
  },
});
