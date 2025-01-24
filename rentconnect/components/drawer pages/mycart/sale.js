import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomCard1} from '../../cards/mycart_sales_cards';

const image = require('../../../components/other/image3.jpg');

export const Sale = ({route}) => {
  const {email, refresh} = route.params || {};
  const [loading, setLoading] = useState(true);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          'http://192.168.181.172:5001/itemsSale',
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setCardsData(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [email, refresh]);

  // const handleWithdraw = async id => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     await axios.patch(
  //       `http://192.168.242.172:5001/withdraw/${id}`,
  //       {flag: false},
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       },
  //     );
  //     setCardsData(prevCards =>
  //       prevCards.map(card =>
  //         card._id === id ? {...card, flag: false} : card,
  //       ),
  //     );
  //   } catch (error) {
  //     console.error('Error updating item flag:', error);
  //   }
  // };
  const handleWithdraw = async id => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`http://192.168.181.172:5001/withdraw/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setCardsData(prevCards => prevCards.filter(card => card._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.row}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {cardsData.map((card, index) => (
              <CustomCard1
                key={index}
                id={card._id} // Pass the id to the CustomCard1
                title={card.price}
                content={card.description}
                imageSource={{uri: card.imageUrl}}
                flag={card.flag}
                email={email}
                name={card.name}
                quantity={card.quantity}
                onWithdraw={handleWithdraw} // Pass the handleWithdraw function
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
