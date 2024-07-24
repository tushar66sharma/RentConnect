
import React, { useState } from 'react';
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
  TextInput,
} from 'react-native';

const image = require('../../components/other/image3.jpg');

const { height } = Dimensions.get('window'); // Get device height

// Example User Data
const Userdata = [
  {
    salername: 'Tushar',
    PhoneNo: 7456945121,
    RollNo: '22BSM062',
    Emailid: 'example1@email.com',
  },
];

const handleView = (email) => {
  Alert.alert(`Order Button Clicked...${email}`);
};

export const OrderDetails_Page = ({ route }) => {
  const { title, content, flag, imageSource, email, quantity: availableQuantity, name } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState('');

  const incrementQuantity = () => {
    if (quantity < availableQuantity) {
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

  const handleQuantityChange = (value) => {
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity)) {
      if (newQuantity >= 1 && newQuantity <= availableQuantity) {
        setQuantity(newQuantity);
        setWarning('');
      } else if (newQuantity < 1) {
        setWarning('Quantity cannot be less than 1');
      } else {
        setWarning('Quantity exceeds available stock');
      }
    }
  };

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
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.counterButton} onPress={decrementQuantity}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity style={styles.counterButton} onPress={incrementQuantity}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            {warning ? <Text style={styles.warningText}>{warning}</Text> : null}

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
              <Text style={styles.productQuantity}>Quantity Available: {availableQuantity}</Text>
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
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
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

