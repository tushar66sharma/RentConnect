import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const searchimage = require('../../components/other/search-normal1.png');
const filter = require('../../components/other/mi_filter1.png');
export const Search = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.searchContainer}>
      <TextInput placeholder="Search" placeholderTextColor={'black'}   style={styles.searchBox} />
      <Image
        source={searchimage}
        resizeMode={'contain'}
        style={styles.searchimage}
      />
      <TouchableOpacity  onPress={()=>navigation.navigate('Filters')}>
        <Image source={filter} style={styles.filterimage} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingLeft: 50,
    backgroundColor: 'white',
  },
  searchimage: {
    height: 35,
    width: 40,
    position: 'absolute',
    left: 27,
    top: 27,
  },
  filterimage: {
    height: 45,
    width: 30,
    position: 'absolute',
    right: 40,
    top:-12,
  },
});
