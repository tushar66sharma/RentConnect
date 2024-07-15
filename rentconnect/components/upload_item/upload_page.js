import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Image, TouchableOpacity,ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
const image = require('../../components/other/image3.jpg');
import { useNavigation } from '@react-navigation/native';

export const Upload = ({route}) => {
  const {email} = route.params;
  const navtigation= useNavigation();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [category,setcategory] =useState('');
  const [note,setnote] =useState('');

  const handleUpload = () => {
    // Logic for handling the upload goes here
    console.log('Item Description:', description);
    console.log('Item Price:', price);
    console.log('Category:',category);
    console.log('Image URI:', imageUri);
    navtigation.navigate('Main');
    Alert.alert(`item uploaded..${email}`);

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

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView>
        <View style={styles.innerbox1}>
          <Text style={styles.text}>Upload Your Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Item Description"
            placeholderTextColor="#aaa"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            placeholderTextColor="#aaa"
            value={category}
            onChangeText={setcategory}
          />
          <TextInput
            style={styles.input}
            placeholder="Important note"
            placeholderTextColor="#aaa"
            value={note}
            onChangeText={setnote}
          />
          <TextInput
            style={styles.input}
            placeholder="Item Price"
            placeholderTextColor="#aaa"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
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
          <TouchableOpacity style={styles.button} onPress={handleUpload}>
            <Text style={styles.buttonText} >Upload</Text>
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
  },
  button: {
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
    textTransform:'uppercase'
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
});

export default Upload;

