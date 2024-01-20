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

const image = require('../../components/other/image3.jpg');

export const Login_page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const users = [
      {email: 'user1@example.com', password: 'password1'},
      {email: 'user2@example.com', password: 'password2'},
    ];

    const user = users.find(
      user => user.email === email && user.password === password,
    );

    if (user) {
      Alert.alert('Login Successful', 'Welcome back!');
      //navigation.navigate('Main_page');
    } else {
      Alert.alert(
        'Login Failed',
        'Invalid email or password. Please try again or sign up',
      );
      setEmail('');
      setPassword('');
    }
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={handleLogin}>
                Log In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
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
