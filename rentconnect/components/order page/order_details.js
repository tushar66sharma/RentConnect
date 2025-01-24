import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '@env';
import RazorpayCheckout from 'react-native-razorpay';
// import {NetworkInfo} from 'react-native-network-info';
const rid = RAZORPAY_KEY_ID;
const sec = RAZORPAY_KEY_SECRET;

const image = require('../../components/other/image3.jpg');
const {height} = Dimensions.get('window'); // Get device height
// const serverIpAddress = require('../../Backend/app');
export const OrderDetails_Page = ({route, navigation}) => {
  const {itemId} = route.params;
  const {email} = route.params;
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(null);
  // const [buyer, setbuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState('');

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

  const incrementQuantity = () => {
    if (quantity < item.quantity) {
      setQuantity(quantity + 1);
      setWarning('');
    } else {
      setWarning('Quantity exceeds available stock');
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setWarning('');
    } else {
      setWarning('Quantity cannot be less than 1');
    }
  };

  const handleQuantityChange = value => {
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity)) {
      if (newQuantity >= 1 && newQuantity <= item.quantity) {
        setQuantity(newQuantity);
        setWarning('');
      } else if (newQuantity < 1) {
        setWarning('Quantity cannot be less than 1');
      } else {
        setWarning('Quantity exceeds available stock');
      }
    }
  };

  // const handleOrderButtonClick = async () => {
  //   // console.log(buyer._id);
  //   try {
  //     const token = await AsyncStorage.getItem('token');

  //     const response = await axios.patch(
  //       `http://192.168.181.172:5001/order/${itemId}/update`,
  //       {orderQuantity: quantity}, // Correct key names
  //       {
  //         headers: {
  //           Authorization: token, // Added 'Bearer ' prefix
  //         },
  //       },
  //     );

  //     if (response.status === 200) {
  //       Alert.alert('Success', 'Order placed successfully');
  //       navigation.navigate('Main_page', {refresh: true}); // Pass a refresh flag to update the Main Page
  //     } else {
  //       Alert.alert('Failed', 'Failed to place order. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'Failed to place order. Please try again.');
  //   }
  // };
  const currency = 'INR';
  const amount = 100;
  const handleOrderButtonClick = async () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: currency,
      key: rid,
      amount: amount * 100,
      name: 'Acme Corp',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  // function successCallback(data) {
  //   console.log('success', data);
  // }

  // function failureCallback(data) {
  //   console.log('payment failed', data);
  // }

  // const handleOrderButtonClick = () => {
  //   RNUpiPayment.initializePayment(
  //     {
  //       vpa: 'bvsharma31july@okicici', // or can be john@ybl or mobileNo@upi
  //       payeeName: 'Bhavana Sharma',
  //       amount: '1',
  //       transactionRef: 'aasf-332-aoei-fn',
  //     },
  //     successCallback,
  //     failureCallback,
  //   );
  // };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!item || !user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load data</Text>
      </View>
    );
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
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={decrementQuantity}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityDisplay}
                value={quantity.toString()}
                onChangeText={handleQuantityChange}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.counterButton}
                onPress={incrementQuantity}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            {warning ? <Text style={styles.warningText}>{warning}</Text> : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleOrderButtonClick}>
              <Text style={styles.buttonText}>Pay Now</Text>
            </TouchableOpacity>

            <View style={styles.itemDetails}>
              <View style={styles.box1}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Price: ₹{item.price}</Text>
              </View>
              <Text style={styles.productQuantity}>
                Quantity Available: {item.quantity}
              </Text>
              <Text style={styles.productDescription}>{item.description}</Text>
            </View>

            <View style={styles.userDetails}>
              <Text style={styles.userTitle}>Seller Details</Text>
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
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
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
  productPrice: {
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
    backgroundColor: '#007bff',
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
