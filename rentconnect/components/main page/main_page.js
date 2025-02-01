import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {CustomCard} from '../cards/main_page_cards';
import {Search} from '../searchbar & filter/search_bar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../../components/other/image3.jpg');
const uploadIcon = require('../../components/other/upload_image5.png');


export const Main_page = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {email} = route.params || {};
  const [cardsData, setCardsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);


  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.181.172:5001/items', {
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

  // Check for global refresh timestamp
  const checkForRefresh = async () => {
    try {
      const storedTimestamp = await AsyncStorage.getItem(
        'lastRefreshTimestamp',
      );
      if (storedTimestamp && storedTimestamp !== lastRefresh) {
        setLastRefresh(storedTimestamp);
        await fetchData();
      }
    } catch (error) {
      console.error('Error checking refresh timestamp:', error);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Check for refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      checkForRefresh();
    }, [lastRefresh]),
  );

  const handleUploadButtonClick = () => {
    navigation.navigate('Upload', {email});
  };

  const handleFilterApplied = filteredItems => {
    setCardsData(filteredItems);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.searchContainer}>
          <Search onFilterApplied={handleFilterApplied} />
        </View>
        <View>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {cardsData.map((card, index) => (
              <CustomCard
                key={index}
                title={`₹${card.price}`}
                content={card.description}
                imageSource={{uri: card.imageUrl}}
                flag={card.flag}
                email={email}
                name={card.name}
                quantity={card.quantity}
                itemId={card._id}
                onRefresh={fetchData}
                onPress={() =>
                  navigation.navigate('OrderDetails_Page', {itemId: card._id})
                }
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
    paddingBottom: 10,
  },
  scrollContainer: {
    paddingTop: 70,
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
    zIndex: 20,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default Main_page;
