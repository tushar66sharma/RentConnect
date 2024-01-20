import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const image = require('../../components/other/image3.jpg');

export const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    mobileNo: '',
    rollNo: '',
  });

  const handleInputChange = (field, text) => {
    setFormData(prevData => ({...prevData, [field]: text}));
  };

  const handleSubmission = () => {
    // Access the values from formData object
    const {email, password, name, mobileNo, rollNo} = formData;

    // Validate or process the data as needed

    // Temporary array to store the form data
    const formDataArray = [
      {field: 'Email', value: email},
      {field: 'Password', value: password},
      {field: 'Name', value: name},
      {field: 'Mobile No.', value: mobileNo},
      {field: 'Roll No.', value: rollNo},
    ];

    // Log the data for testing purposes
    console.log('Form Data Array:', formDataArray);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        
          <View style={styles.outerbox}>
            <Text style={styles.textinsidebox}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
            />
            <Text style={styles.textinsidebox}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Type here..."
              value={formData.password}
              onChangeText={text => handleInputChange('password', text)}
            />
            <Text style={styles.textinsidebox}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
            <Text style={styles.textinsidebox}>Mobile No.</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={formData.mobileNo}
              onChangeText={text => handleInputChange('mobileNo', text)}
            />
            <Text style={styles.textinsidebox}>Roll No.</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={formData.rollNo}
              onChangeText={text => handleInputChange('rollNo', text)}
            />

            <View style={styles.box2}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmission}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
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
  outerbox: {
    backgroundColor: 'white',
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 20,
    borderColor: "'rgba(0, 0, 1)'",
  },
  textinsidebox: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 25,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  box2: {
    marginTop: 35,
    marginBottom: 20,
  },
});
