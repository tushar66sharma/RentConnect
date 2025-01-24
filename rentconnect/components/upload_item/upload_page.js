import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
const image = require('../../components/other/image3.jpg');
import {useNavigation} from '@react-navigation/native';

const categories = [
  'Electronics',
  'Daily Uses',
  'Food',
  'Books',
  'Clothes',
  'Tools',
  'Academic Resources',
  'Lost and Found',
  'Food Sharing',
  'Other',
];

export const Upload = ({route}) => {
  const navigation = useNavigation();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imageUri, setImageUri] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedEmail = await AsyncStorage.getItem('email');
      setToken(storedToken);
      setEmail(storedEmail);
    };
    fetchData();
  }, []);

  const handleUpload = async () => {
    if (!itemName || !description || !category || !price || !quantity) {
      Alert.alert('All fields are required!');
      return;
    }

    const itemData = {
      name: itemName,
      description,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      imageUrl: imageUri,
      owner: email, // assuming email is used as the owner identifier
    };
    try {
      const response = await axios.post(
        'http://172.27.39.25:5001/items',
        itemData,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log(response.data);
      Alert.alert('Item uploaded successfully!');
      navigation.navigate('Mycart', {
        screen: 'Sale',
        params: {refresh: true},
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to upload item. Please try again.');
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
      }
    });
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectCategory = selectedCategory => {
    setCategory(selectedCategory);
    setDropdownVisible(false);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleDescriptionChange = text => {
    if (text.length <= 150) {
      setDescription(text);
    } else {
      Alert.alert(
        'Limit Exceeded',
        'Description can only be up to 150 characters.',
      );
    }
  };

  const handlePriceChange = text => {
    if (/^\d*$/.test(text)) {
      setPrice(text);
    } else {
      Alert.alert('Invalid Input', 'Please enter numbers only');
    }
  };

  const handleQuantityChange = text => {
    if (/^\d*$/.test(text)) {
      setQuantity(parseInt(text) || 1);
    } else {
      Alert.alert('Invalid Input', 'Please enter numbers only');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView>
          <View style={styles.innerbox1}>
            <Text style={styles.text}>Upload Your Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              placeholderTextColor="white"
              value={itemName}
              onChangeText={setItemName}
            />
            <TextInput
              style={styles.input}
              placeholder="Item Description (max 150 characters)"
              placeholderTextColor="white"
              value={description}
              onChangeText={handleDescriptionChange}
              maxLength={150} // Limit input to 150 characters
              multiline
            />
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={toggleDropdown}>
              <Text style={styles.dropdownInputText}>
                {category || 'Select Category'}
              </Text>
              <Icon
                name="chevron-down-outline"
                size={20}
                color="white"
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
            {dropdownVisible && (
              <View style={styles.dropdownContainer}>
                <ScrollView style={styles.dropdown} nestedScrollEnabled>
                  {categories.map((cat, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => selectCategory(cat)}
                      style={styles.dropdownItem}>
                      <Text style={styles.dropdownItemText}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            <TextInput
              style={styles.input}
              placeholder="Item Price"
              placeholderTextColor="white"
              value={price}
              onChangeText={handlePriceChange}
              keyboardType="numeric"
            />
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                placeholder="Quantity"
                placeholderTextColor="white"
                value={String(quantity)} // Set value to quantity state
                onChangeText={handleQuantityChange}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={selectImage}>
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            {imageUri && (
              <View style={styles.imageContainer}>
                <Image source={{uri: imageUri}} style={styles.selectedImage} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={removeImage}>
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={styles.button1} onPress={handleUpload}>
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
          </View>
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
  innerbox1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    opacity: 1,
  },
  text: {
    fontSize: 40,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'white',
    backgroundColor: 'black',
  },
  dropdownInput: {
    width: '80%',
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingRight: 40, // Make room for the icon
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'black',
  },
  dropdownInputText: {
    color: 'white',
    fontSize: 16,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
    top: 8,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    width: '80%',
    maxHeight: 200,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'black',
    marginBottom: 20,
  },
  dropdown: {
    paddingVertical: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'black',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quantityInput: {
    width: 80,
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginHorizontal: 10,
    color: 'white',
    backgroundColor: 'black',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Upload;
