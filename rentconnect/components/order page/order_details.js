// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   Dimensions,
//   TextInput,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RazorpayCheckout from 'react-native-razorpay';
// import {RAZORPAY_KEY_ID} from '@env';

// const image = require('../../components/other/image3.jpg');
// const {height} = Dimensions.get('window');

// export const OrderDetails_Page = ({route, navigation}) => {
//   const {itemId} = route.params;
//   const [item, setItem] = useState(null);
//   const [seller, setUser] = useState(null);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [warning, setWarning] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const itemResponse = await axios.get(
//           `http://192.168.181.172:5001/order-details/${itemId}`,
//           {
//             headers: {
//               Authorization: token,
//             },
//           },
//         );
//         setItem(itemResponse.data.item);
//         setUser(itemResponse.data.user);

//         const userDataResponse = await axios.post(
//           'http://192.168.181.172:5001/userdata',
//           {token},
//           {
//             headers: {
//               Authorization: token,
//             },
//           },
//         );
//         setLoggedInUser(userDataResponse.data.data);
//       } catch (error) {
//         console.error(error);
//         Alert.alert('Error', 'Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [itemId]);

//   const incrementQuantity = () => {
//     if (quantity < item.quantity) {
//       setQuantity(quantity + 1);
//       setWarning('');
//     } else {
//       setWarning('Quantity exceeds available stock');
//     }
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//       setWarning('');
//     } else {
//       setWarning('Quantity cannot be less than 1');
//     }
//   };

//   const handleQuantityChange = value => {
//     const newQuantity = parseInt(value);
//     if (!isNaN(newQuantity)) {
//       if (newQuantity >= 1 && newQuantity <= item.quantity) {
//         setQuantity(newQuantity);
//         setWarning('');
//       } else if (newQuantity < 1) {
//         setWarning('Quantity cannot be less than 1');
//       } else {
//         setWarning('Quantity exceeds available stock');
//       }
//     }
//   };

//   const handleOrderButtonClick = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const orderAmount = item.price * quantity;

//       const options = {
//         description: 'Order Payment',
//         image: 'https://i.imgur.com/3g7nmJC.jpg',
//         currency: 'INR',
//         key: RAZORPAY_KEY_ID,
//         amount: orderAmount * 100,
//         name: 'RentConnect',
//         prefill: {
//           email: loggedInUser.email,
//           contact: loggedInUser.mobileNo,
//           name: loggedInUser.name,
//         },
//         theme: {color: '#53a20e'},
//       };

//       RazorpayCheckout.open(options)
//         .then(async data => {
//           const orderData = {
//             name: item.name,
//             description: item.description,
//             category: item.category,
//             price: item.price,
//             quantity: quantity,
//             imageUrl: item.imageUrl,
//             orderId: data.razorpay_payment_id,
//             owner: seller._id,
//             renter: loggedInUser._id,
//           };

//           // Post the order data
//           await axios.post('http://192.168.181.172:5001/orders', orderData, {
//             headers: {
//               Authorization: token,
//             },
//           });

//           // Update item quantity
//           await axios.patch(
//             `http://192.168.181.172:5001/order/${itemId}/update`,
//             {orderQuantity: quantity},
//             {
//               headers: {
//                 Authorization: token,
//               },
//             },
//           );

//           Alert.alert('Success', 'Order placed successfully');

//           // Store refresh timestamp in AsyncStorage
//           const refreshTimestamp = new Date().getTime().toString();
//           await AsyncStorage.setItem('lastRefreshTimestamp', refreshTimestamp);

//           // Navigate to Sale page
//           navigation.reset({
//             index: 0,
//             routes: [
//               {
//                 name: 'Mycart',
//                 params: {
//                   screen: 'Rent',
//                   refresh: refreshTimestamp,
//                   email: loggedInUser.email,
//                 },
//               },
//             ],
//           });
//         })
//         .catch(error => {
//           console.error(error);
//           Alert.alert(
//             'Payment Failed',
//             `Error: ${error.code} | ${error.description}`,
//           );
//         });
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to place order. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (!item || !seller || !loggedInUser) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Failed to load data</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={image} resizeMode="cover" style={styles.image}>
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <View style={styles.cardImageContainer}>
//             <Image
//               source={{uri: item.imageUrl}}
//               style={styles.cardImage}
//               resizeMode="cover"
//             />
//           </View>

//           <View style={styles.detailsContainer}>
//             <View style={styles.quantityContainer}>
//               <TouchableOpacity
//                 style={styles.counterButton}
//                 onPress={decrementQuantity}>
//                 <Text style={styles.counterButtonText}>-</Text>
//               </TouchableOpacity>
//               <TextInput
//                 style={styles.quantityDisplay}
//                 value={quantity.toString()}
//                 onChangeText={handleQuantityChange}
//                 keyboardType="numeric"
//               />
//               <TouchableOpacity
//                 style={styles.counterButton}
//                 onPress={incrementQuantity}>
//                 <Text style={styles.counterButtonText}>+</Text>
//               </TouchableOpacity>
//             </View>
//             {warning ? <Text style={styles.warningText}>{warning}</Text> : null}

//             <TouchableOpacity
//               style={styles.button}
//               onPress={handleOrderButtonClick}>
//               <Text style={styles.buttonText}>Pay Now</Text>
//             </TouchableOpacity>

//             <View style={styles.itemDetails}>
//               <View style={styles.box1}>
//                 <Text style={styles.productName}>{item.name}</Text>
//                 <Text style={styles.productPrice}>Price: ₹{item.price}</Text>
//               </View>
//               <Text style={styles.productQuantity}>
//                 Quantity Available: {item.quantity}
//               </Text>
//               <Text style={styles.productDescription}>{item.description}</Text>
//             </View>

//             <View style={styles.userDetails}>
//               <Text style={styles.userTitle}>Seller Details</Text>
//               <Text style={styles.userDetail}>Name: {seller.name}</Text>
//               <Text style={styles.userDetail}>Phone No: {seller.mobileNo}</Text>
//               <Text style={styles.userDetail}>Roll No: {seller.rollNo}</Text>
//               <Text style={styles.userDetail}>Email: {seller.email}</Text>
//             </View>
//           </View>
//         </ScrollView>
//       </ImageBackground>
//     </View>
//   );
// };
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
import RazorpayCheckout from 'react-native-razorpay';
import {RAZORPAY_KEY_ID} from '@env';

const image = require('../../components/other/image3.jpg');
const {height} = Dimensions.get('window');

export const OrderDetails_Page = ({route, navigation}) => {
  const {itemId} = route.params;
  const [item, setItem] = useState(null);
  const [seller, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const itemResponse = await axios.get(
          `http://192.168.181.172:5001/order-details/${itemId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setItem(itemResponse.data.item);
        setUser(itemResponse.data.user);

        const userDataResponse = await axios.post(
          'http://192.168.181.172:5001/userdata',
          {token},
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setLoggedInUser(userDataResponse.data.data);
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
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     const orderAmount = item.price * quantity;

  //     const options = {
  //       description: 'Order Payment',
  //       image: 'https://i.imgur.com/3g7nmJC.jpg',
  //       currency: 'INR',
  //       key: RAZORPAY_KEY_ID,
  //       amount: orderAmount * 100,
  //       name: 'RentConnect',
  //       prefill: {
  //         email: loggedInUser.email,
  //         contact: loggedInUser.mobileNo,
  //         name: loggedInUser.name,
  //       },
  //       theme: {color: '#53a20e'},
  //     };

  //     RazorpayCheckout.open(options)
  //       .then(async data => {
  //         const orderData = {
  //           name: item.name,
  //           description: item.description,
  //           category: item.category,
  //           price: item.price,
  //           quantity: quantity,
  //           imageUrl: item.imageUrl,
  //           orderId: data.razorpay_payment_id,
  //           owner: seller._id,
  //           renter: loggedInUser._id,
  //         };

  //         // Post the order data
  //         await axios.post('http://192.168.181.172:5001/orders', orderData, {
  //           headers: {
  //             Authorization: token,
  //           },
  //         });

  //         // Update item quantity
  //         await axios.patch(
  //           `http://192.168.181.172:5001/order/${itemId}/update`,
  //           {orderQuantity: quantity},
  //           {
  //             headers: {
  //               Authorization: token,
  //             },
  //           },
  //         );

  //         // Store refresh timestamp in AsyncStorage
  //         const refreshTimestamp = new Date().getTime().toString();
  //         await AsyncStorage.setItem('lastRefreshTimestamp', refreshTimestamp);

  //         Alert.alert('Success', 'Order placed successfully', [
  //           {
  //             text: 'OK',
  //             onPress: () => {
  //               // First navigate to Rent page
  //               navigation.navigate('Mycart', {
  //                 screen: 'Rent',
  //                 params: {
  //                   refresh: refreshTimestamp,
  //                   email: loggedInUser.email,
  //                 },
  //               });

  //               // Then reset navigation to Main page with refresh params
  //               setTimeout(() => {
  //                 navigation.reset({
  //                   index: 0,
  //                   routes: [
  //                     {
  //                       name: 'Main_page',
  //                       params: {
  //                         refresh: refreshTimestamp,
  //                         email: loggedInUser.email,
  //                       },
  //                     },
  //                   ],
  //                 });
  //               }, 100);
  //             },
  //           },
  //         ]);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         Alert.alert(
  //           'Payment Failed',
  //           `Error: ${error.code} | ${error.description}`,
  //         );
  //       });
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'Failed to place order. Please try again.');
  //   }
  // };

  const handleOrderButtonClick = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const orderAmount = item.price * quantity;
  
      const options = {
        description: 'Order Payment',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: RAZORPAY_KEY_ID,
        amount: orderAmount * 100,
        name: 'RentConnect',
        prefill: {
          email: loggedInUser.email,
          contact: loggedInUser.mobileNo,
          name: loggedInUser.name,
        },
        theme: {color: '#53a20e'},
      };
  
      RazorpayCheckout.open(options)
        .then(async data => {
          const orderData = {
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            quantity: quantity,
            imageUrl: item.imageUrl,
            orderId: data.razorpay_payment_id,
            owner: seller._id,
            renter: loggedInUser._id,
          };
  
          // Post the order data
          await axios.post('http://192.168.181.172:5001/orders', orderData, {
            headers: {
              Authorization: token,
            },
          });
  
          // Update item quantity
          await axios.patch(
            `http://192.168.181.172:5001/order/${itemId}/update`,
            {orderQuantity: quantity},
            {
              headers: {
                Authorization: token,
              },
            },
          );
  
          // Store refresh timestamps
          const refreshTimestamp = new Date().getTime().toString();
          await AsyncStorage.setItem('lastRefreshTimestamp', refreshTimestamp);
          await AsyncStorage.setItem('lastOrderTimestamp', refreshTimestamp);
  
          Alert.alert('Success', 'Order placed successfully', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Mycart', {
                  screen: 'Rent',
                  params: {
                    email: loggedInUser.email,
                    refresh: refreshTimestamp // Pass refresh timestamp to Rent screen
                  },
                });
              },
            },
          ]);
        })
        .catch(error => {
          console.error(error);
          Alert.alert(
            'Payment Failed',
            `Error: ${error.code} | ${error.description}`,
          );
        });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!item || !seller || !loggedInUser) {
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
              <Text style={styles.userDetail}>Name: {seller.name}</Text>
              <Text style={styles.userDetail}>Phone No: {seller.mobileNo}</Text>
              <Text style={styles.userDetail}>Roll No: {seller.rollNo}</Text>
              <Text style={styles.userDetail}>Email: {seller.email}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  cardImageContainer: {
    width: '100%',
    height: height * 0.4,
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
    backgroundColor: '#000000',
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginTop: 0,
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
    color: 'white',
  },
  warningText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
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
});

export default OrderDetails_Page;
