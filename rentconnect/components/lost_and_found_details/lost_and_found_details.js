import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {SendDirectSms} from 'react-native-send-direct-sms';

const image = require('../../components/other/image3.jpg');

const {height} = Dimensions.get('window'); // Get device height

export const Lost_and_Found_Details_Page = ({route}) => {
  // const route = useRoute();
  const {itemId} = route.params; // Get itemId from route params
  const navigation = useNavigation();
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [bodySMS, setBodySMS] = React.useState(
    'Your item has been Reported....',
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `http://192.168.181.172:5001/order-details/${itemId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setItem(response.data.item);
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [itemId]);

  const requestSmsPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
            title: 'SMS Permission',
            message: 'This app needs access to your SMS to send messages.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('SMS permission granted');
          sendSmsData('5554', bodySMS);
        } else {
          console.log('SMS permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function sendSmsData(mobileNumber, bodySMS) {
    SendDirectSms(mobileNumber, bodySMS)
      .then(res => console.log('SMS sent successfully', res))
      .catch(err => console.error('Error sending SMS', err));
  }

  const handleView = email => {
    Alert.alert(`Report Button Clicked...${email}`);
    requestSmsPermission();
    navigation.navigate('Lost and Found');
  };

  if (!item || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardImageContainer}>
            <Image
              source={{uri: item.imageUrl}}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.detailsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleView(user.email)}>
              <Text style={styles.buttonText}>Report</Text>
            </TouchableOpacity>

            <View style={styles.itemDetails}>
              <View style={styles.box1}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productTitle}>{item.title}</Text>
              </View>
              <Text style={styles.productQuantity}>
                Quantity: {item.quantity}
              </Text>
              <Text style={styles.productDescription}>{item.description}</Text>
            </View>

            <View style={styles.userDetails}>
              <Text style={styles.userTitle}>Person's Details</Text>
              <Text style={styles.userDetail}>Name: {user.name}</Text>
              <Text style={styles.userDetail}>Phone No: {user.mobileNo}</Text>
              <Text style={styles.userDetail}>Roll No: {user.rollNo}</Text>
              <Text style={styles.userDetail}>Email: {user.email}</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cardImageContainer: {
    width: '100%',
    height: height * 0.4, // Adjusted for better layout
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'black',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#000000', // Changed background color
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginTop: 0, // Adjust to overlap with card image
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  counterButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityDisplay: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  warningText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemDetails: {
    marginBottom: 20,
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginRight: 20,
  },
  productDescription: {
    fontSize: 16,
    color: 'white',
    marginBottom: 14,
  },
  productQuantity: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  productEmail: {
    fontSize: 18,
    color: 'white',
  },
  userDetails: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  userTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  userDetail: {
    fontSize: 18,
    color: 'white',
    marginBottom: 6,
  },
  button: {
    backgroundColor: 'red',
    height: 45,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
