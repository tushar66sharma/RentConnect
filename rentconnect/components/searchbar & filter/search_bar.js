// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   SafeAreaView,
//   Image,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const searchimage = require('../../components/other/search-normal1.png');
// const filter = require('../../components/other/mi_filter1.png');

// const items = [
//   'RemoveFilter',
//   'Electronics',
//   'Daily Uses',
//   'Food',
//   'Books',
//   'Clothes',
//   'Tools',
//   'Other',
// ];

// export const Search = ({onFilterApplied}) => {
//   const navigation = useNavigation();
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [filteredItems, setFilteredItems] = useState(items);

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const applyFilter = async filterName => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(
//         `http://192.168.242.172:5001/items/category/${filterName}`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         },
//       );
//       onFilterApplied(response.data);
//       Alert.alert('Filter applied', `${filterName} applied`);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Failed to apply filter. Please try again.');
//     }
//     setDropdownVisible(false);
//   };

//   const handleSearch = text => {
//     setSearchText(text);
//     setFilteredItems(
//       items.filter(item => item.toLowerCase().includes(text.toLowerCase())),
//     );
//   };

//   return (
//     <SafeAreaView style={styles.searchContainer}>
//       <TextInput
//         placeholder="Search"
//         placeholderTextColor={'black'}
//         style={styles.searchBox}
//         value={searchText}
//         onChangeText={handleSearch}
//       />
//       <Image
//         source={searchimage}
//         resizeMode={'contain'}
//         style={styles.searchimage}
//       />
//       <TouchableOpacity onPress={toggleDropdown}>
//         <Image source={filter} style={styles.filterimage} />
//       </TouchableOpacity>
//       {dropdownVisible && (
//         <View style={styles.dropdownContainer}>
//           <ScrollView style={styles.dropdown} nestedScrollEnabled>
//             {filteredItems.map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => applyFilter(item)}
//                 style={styles.dropdownItem}>
//                 <Text style={styles.dropdownItemText}>{item}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchBox: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginLeft: 20,
//     marginRight: 20,
//     marginTop: 20,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     paddingLeft: 50,
//     backgroundColor: 'white',
//   },
//   searchimage: {
//     height: 35,
//     width: 40,
//     position: 'absolute',
//     left: 27,
//     top: 27,
//   },
//   filterimage: {
//     height: 45,
//     width: 30,
//     position: 'absolute',
//     right: 40,
//     top: -12,
//   },
//   dropdownContainer: {
//     position: 'absolute',
//     top: 70,
//     right: 20,
//     width: 350,
//     maxHeight: 200,
//     backgroundColor: 'white',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     zIndex: 1,
//   },
//   dropdown: {
//     maxHeight: 200,
//   },
//   dropdownItem: {
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//     backgroundColor: 'white',
//   },
//   dropdownItemText: {
//     fontSize: 20,
//   },
// });

// export default Search;

import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const searchimage = require('../../components/other/search-normal1.png');
const filter = require('../../components/other/mi_filter1.png');

const items = [
  'RemoveFilter',
  'Electronics',
  'Daily Uses',
  'Food',
  'Books',
  'Clothes',
  'Tools',
  'Academic Resources',
  'Food Sharing',
  'Other',
];

export const Search = ({onFilterApplied}) => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const applyFilter = async filterName => {
    console.log('Applying filter:', filterName); // Debugging line
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(
        'Request URL:',
        `http://192.168.179.241:5001/items/category/${filterName}`,
      );
      console.log('Request Headers:', {Authorization: token});

      let response;

      if (filterName === 'RemoveFilter') {
        response = await axios.get('http://192.168.179.241:5001/items', {
          headers: {
            Authorization: token,
          },
        });
        Alert.alert('Filter removed', 'All items are now visible');
      } else {
        response = await axios.get(
          `http://192.168.179.241:5001/items/category/${filterName}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        Alert.alert('Filter applied', `${filterName} applied`);
      }

      console.log('Response Data:', response.data); // Debugging line
      onFilterApplied(response.data);
    } catch (error) {
      console.error('Error applying filter:', error.message); // Debugging line
      Alert.alert('Failed to apply filter. Please try again.');
    }
    setDropdownVisible(false);
  };

  const handleSearch = text => {
    setSearchText(text);
    setFilteredItems(
      items.filter(item => item.toLowerCase().includes(text.toLowerCase())),
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
                style={styles.dropdownItem}>
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
    width: 350,
    maxHeight: 200,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  dropdown: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 15,
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
