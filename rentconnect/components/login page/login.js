import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../../components/other/image3.jpg');

export const Login_page = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(email, password);
    const userData = {
      email: email,
      password: password,
    };
    axios
      .post('http://192.168.181.172:5001/login-user', userData)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'ok') {
          Alert.alert('Logged In Successfully');
          AsyncStorage.setItem('token', res.data.data);
          AsyncStorage.setItem('email', email); // Store email locally
          navigation.navigate('Root', {email: email}); // Navigate to Root with email parameter
        } else {
          Alert.alert('Login Failed', res.data.message || 'Unknown error');
        }
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Login Failed', 'An error occurred. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.texthead1}>UNLOCK THE SHARING</Text>
        <Text style={styles.texthead1}>ECONOMY...</Text>
        <Text style={styles.texthead2}>RENT</Text>
        <Text style={styles.texthead2}>CONNECT</Text>
        <Text style={styles.texthead3}>-RENT, SHARE AND SAVE</Text>
        <View style={styles.outerbox}>
          <Text style={styles.textinsidebox}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Text style={styles.textinsidebox}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Type here..."
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <View style={styles.box2}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  texthead1: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Arial',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  texthead2: {
    fontSize: 70,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Monospace',
  },
  texthead3: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Arial',
  },
  outerbox: {
    backgroundColor: 'white',
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 1, 0.1)',
    borderWidth: 1,
    padding: 20,
  },
  textinsidebox: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  box2: {
    marginTop: 20,
  },
});

export default Login_page;
