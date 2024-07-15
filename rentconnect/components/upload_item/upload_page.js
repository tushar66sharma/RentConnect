
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
const image = require('../../components/other/image3.jpg');
import { useNavigation } from '@react-navigation/native';

const categories = [
  'Electronics',
  'Daily Uses',
  'Food',
  'Books',  
  'Clothes',
  'Tools',
];

export const Upload = () => {
  const navigation = useNavigation();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleUpload = () => {
    console.log('Item Name:', itemName);
    console.log('Item Description:', description);
    console.log('Item Price:', price);
    console.log('Category:', category);
    console.log('Image URI:', imageUri);
    console.log('Quantity:', quantity);
    navigation.navigate('Main');
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
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

  const selectCategory = (selectedCategory) => {
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

  const handleDescriptionChange = (text) => {
    if (text.length <= 50) {
      setDescription(text);
    } else {
      Alert.alert('Limit Exceeded', 'Description can only be up to 50 characters.');
    }
  };

  const handlePriceChange = (text) => {
    if (/^\d*$/.test(text)) {
      setPrice(text);
    } else {
      Alert.alert('Invalid Input', 'Please enter numbers only');
    }
  };

  const handleQuantityChange = (text) => {
    if (/^\d*$/.test(text)) {
      setQuantity(parseInt(text) || 1);
    } else {
      Alert.alert('Invalid  Input', 'Please enter numbers only');
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
              maxLength={150} // Limit input to 50 characters
              multiline
            />
            <TouchableOpacity style={styles.dropdownInput} onPress={toggleDropdown}>
              <Text style={styles.dropdownInputText}>{category || 'Select Category'}</Text>
              <Icon name="chevron-down-outline" size={20} color="white" style={styles.dropdownIcon} />
            </TouchableOpacity>
            {dropdownVisible && (
              <View style={styles.dropdownContainer}>
                <ScrollView style={styles.dropdown} nestedScrollEnabled>
                  {categories.map((cat, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => selectCategory(cat)}
                      style={styles.dropdownItem}
                    >
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
            
              <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                placeholder="Quantity"
                placeholderTextColor="white"
               // value={String(quantity)}
                onChangeText={handleQuantityChange}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={selectImage}>
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            {imageUri && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
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
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  imageContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    position: 'relative',
    width: '80%',
    maxHeight: 200,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1,
  },
  dropdown: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5, // Add margin between buttons and input
  },
  quantityButtonText: {
    color: 'white',
   fontSize: 20,
  },
  quantityInput: {
    width: 120, // Adjust width to fit placeholder and buttons
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'black',
  },
});

export default Upload;
