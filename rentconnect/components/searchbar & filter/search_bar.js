
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const searchimage = require('../../components/other/search-normal1.png');
const filter = require('../../components/other/mi_filter1.png');

const items = [
  'Electronics',
  'Daily Uses',
  'Food',
  'Books',
  'Clothes',
  'Tools',
];

export const Search = () => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const applyFilter = (filterName) => {
    Alert.alert('Filter applied', `${filterName} applied`);
    setDropdownVisible(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    setFilteredItems(
      items.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <SafeAreaView style={styles.searchContainer}>
      <TextInput
        placeholder="Search"
        placeholderTextColor={'black'}
        style={styles.searchBox}
        value={searchText}
        onChangeText={handleSearch}
      />
      <Image
        source={searchimage}
        resizeMode={'contain'}
        style={styles.searchimage}
      />
      <TouchableOpacity onPress={toggleDropdown}>
        <Image source={filter} style={styles.filterimage} />
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <ScrollView style={styles.dropdown} nestedScrollEnabled>
            {filteredItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => applyFilter(item)}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
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
    top: -12,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 70,
    right: 20,
    width: 220, // Set the width for the dropdown
    maxHeight: 200, // Set the maximum height for the dropdown
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  dropdown: {
    maxHeight: 200, // Ensure the scroll view respects the max height
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  dropdownItemText: {
    fontSize: 20,
  },
});

export default Search;

