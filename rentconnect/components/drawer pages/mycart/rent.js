// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import axios from 'axios';
// import {CustomCard2} from '../../cards/mycart_rent_cards';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const image = require('../../../components/other/image3.jpg');

// export const Rent = ({route}) => {
//   const {email} = route.params;
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const response = await axios.get(
//           'http://192.168.181.172:5001/fetchOrder',
//           {
//             headers: {
//               Authorization: token,
//             },
//           },
//         );
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [email]);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={image} resizeMode="cover" style={styles.image}>
//         <View style={styles.row}>
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             {orders.map((order, index) => (
//               <CustomCard2
//                 key={index}
//                 id={order._id}
//                 title={order.price}
//                 content={order.description}
//                 imageSource={{uri: order.imageUrl}}
//                 email={email}
//                 name={order.name}
//                 quantity={order.quantity}
//               />
//             ))}
//           </ScrollView>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//   },
//   innerbox1: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 40,
//     color: 'white',
//   },
//   whiteBox: {
//     backgroundColor: 'white',
//     borderRadius: 0,
//     padding: 10,
//     paddingTop: 15,
//     paddingBottom: 15,
//     width: '95%',
//     maxWidth: 600,
//     marginBottom: 50,
//     flex: 1,
//     opacity: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   scrollContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     flexDirection: 'row',
//   },
// });
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {CustomCard2} from '../../cards/mycart_rent_cards';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../../../components/other/image3.jpg');

export const Rent = ({route}) => {
  const {email, refresh} = route.params || {};
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'http://192.168.181.172:5001/fetchOrder',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrders();
  }, []);

  // Initial fetch when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch when refresh param changes (from navigation)
  useEffect(() => {
    if (refresh) {
      fetchOrders();
    }
  }, [refresh]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const checkForNewOrders = async () => {
        try {
          const lastOrderTimestamp = await AsyncStorage.getItem(
            'lastOrderTimestamp',
          );
          if (lastOrderTimestamp) {
            await fetchOrders();
            // Clear the timestamp after fetching
            await AsyncStorage.removeItem('lastOrderTimestamp');
          }
        } catch (error) {
          console.error('Error checking for new orders:', error);
        }
      };

      checkForNewOrders();
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.row}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#0000ff']}
              />
            }>
            {orders.length === 0 ? (
              <View style={styles.noOrdersContainer}>
                <Text style={styles.noOrdersText}>No orders found</Text>
              </View>
            ) : (
              orders.map((order, index) => (
                <CustomCard2
                  key={index}
                  id={order._id}
                  title={order.price}
                  content={order.description}
                  imageSource={{uri: order.imageUrl}}
                  email={email}
                  name={order.name}
                  quantity={order.quantity}
                />
              ))
            )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerbox1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
  whiteBox: {
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    width: '95%',
    maxWidth: 600,
    marginBottom: 50,
    flex: 1,
    opacity: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noOrdersText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default Rent;
