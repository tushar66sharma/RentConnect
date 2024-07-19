import React from 'react';
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
} from 'react-native';

const image = require('../../components/other/image3.jpg');

const {height} = Dimensions.get('window'); // Get device height

// Example User Data
const Userdata = [
  {
    salername: 'Tushar',
    PhoneNo: 7456945121,
    RollNo: '22BSM062',
    Emailid: 'example1@email.com',
  },
];

const handleView = email => {
  Alert.alert(`Order Button Clicked...${email}`);
};

export const OrderDetails_Page = ({route}) => {
  const {title, content, flag, imageSource, email, quantity, name} = route.params;

  // Assuming there's only one user data in the array
  const user = Userdata[0];

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardImageContainer}>
            <Image
              source={imageSource}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.detailsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleView(email)}
            >
              <Text style={styles.buttonText}>Order</Text>
            </TouchableOpacity>

            <View style={styles.itemDetails}>
              <View style={styles.box1}>
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productTitle}>{title}</Text>
              </View>
              <Text style={styles.productQuantity}>Quantity: {quantity}</Text>
              <Text style={styles.productDescription}>{content}</Text>
                
            </View>

            <View style={styles.userDetails}>
              <Text style={styles.userTitle}>Seller Details</Text>
              <Text style={styles.userDetail}>Name: {user.salername}</Text>
              <Text style={styles.userDetail}>Phone No: {user.PhoneNo}</Text>
              <Text style={styles.userDetail}>Roll No: {user.RollNo}</Text>
              <Text style={styles.userDetail}>Email: {user.Emailid}</Text>
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
    
    borderRadius:20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginTop:0, // Adjust to overlap with card image
    marginBottom:20,
    marginLeft:5,
    marginRight:5,
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
