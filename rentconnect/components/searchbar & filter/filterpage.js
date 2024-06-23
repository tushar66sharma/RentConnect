import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  ScrollViewComponent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const FilterPage = () => {
  const navigation = useNavigation();
  const [pressed_electronics, setpressed_electronics] = useState(false);
  const [pressed_books, setpressed_books] = useState(false);
  const [pressed_daily_uses, setpressed_daily_uses] = useState(false);
  const [pressed_study, setpressed_study] = useState(false);
  const [pressed_food, setpressed_food] = useState(false);
  const [pressed_tools, setpressed_tools] = useState(false);
  const [pressed_clothes, setpressed_clothes] = useState(false);
  const handlePress1 = () => {
    setpressed_electronics(!pressed_electronics);
  };
  const handlePress2 = () => {
    setpressed_books(!pressed_books);
  };
  const handlePress3 = () => {
    setpressed_daily_uses(!pressed_daily_uses);
  };
  const handlePress4 = () => {
    setpressed_study(!pressed_study);
  };
  const handlePress5 = () => {
    setpressed_food(!pressed_food);
  };
  const handlePress6 = () => {
    setpressed_tools(!pressed_tools);
  };
  const handlePress7 = () => {
    setpressed_clothes(!pressed_clothes);
  };
  const handleApplyFilter = () => {
    navigation.navigate('Main');
    console.log('Filters applied!');
  };
  const handleCancel = () => {
    setpressed_electronics(false);
    setpressed_books(false);
    setpressed_daily_uses(false);
    setpressed_study(false);
    setpressed_food(false);
    setpressed_tools(false);
    setpressed_clothes(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <TouchableOpacity
            style={[styles.button, pressed_electronics && styles.buttonPressed]}
            onPress={handlePress1}>
            <Text style={styles.buttonText}>Electronics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, pressed_books && styles.buttonPressed]}
            onPress={handlePress2}>
            <Text style={styles.buttonText}>Books</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, pressed_daily_uses && styles.buttonPressed]}
            onPress={handlePress3}>
            <Text style={styles.buttonText}>Daily Uses</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity
            style={[styles.button, pressed_study && styles.buttonPressed]}
            onPress={handlePress4}>
            <Text style={styles.buttonText}>Study</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, pressed_food && styles.buttonPressed]}
            onPress={handlePress5}>
            <Text style={styles.buttonText}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, pressed_tools && styles.buttonPressed]}
            onPress={handlePress6}>
            <Text style={styles.buttonText}>Tools</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity
            style={[styles.button, pressed_clothes && styles.buttonPressed]}
            onPress={handlePress7}>
            <Text style={styles.buttonText}>Clothes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.applyButtonContainer}>
          <TouchableOpacity style={styles.cancelbutton} onPress={handleCancel}>
            <Text style={styles.canceltext}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyFilter}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87ceeb',
  },
  container1: {
    flex: 1,
  },
  container2: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 50,
  },
  headings: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 20,
    color: 'black',
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 120,
    marginLeft: 10,
  },
  buttonPressed: {
    backgroundColor: '#ff0000',
    borderColor: 'Black',
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    // fontFamily: 'Urbanist-Light',
  },
  applyButtonContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: 'black',
    height: 100,
    left: 0,
    right: 0,
  },

  cancelbutton: {
    position: 'absolute',
    left: 40,
    top: 35,
  },
  canceltext: {
    fontSize: 20,
    fontFamily: 'Urbanist-Bold',
    color: 'black',
  },
  applyButton: {
    backgroundColor: '#122C3E',
    borderRadius: 10,
    position: 'absolute',
    width: 250,
    height: 61,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 140,
    top: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Urbanist-Bold',
  },
});
