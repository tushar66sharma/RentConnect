import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


interface CustomCardProps {
  title: string;
  content: string;
  flag:boolean;
  //children?: ReactNode;
  cardStyle?: object;
  imageSource?: ImageSourcePropType;
  email:string;
}

export const CustomCard1: React.FC<CustomCardProps> = ({
  title,
  content,
  flag,
  cardStyle = {},
  imageSource,
  email,
}) => {

  const handleView = () => {};

  const renderTextInput = () => {
    if (flag) {
      return (
        <TextInput
          style={[styles.input, {backgroundColor: '#3cb371'}]}
          placeholder="Available"
          editable={false}
          placeholderTextColor="#000000"
        />
      );
    } else {
      return (
        <TextInput
          style={[styles.input, {backgroundColor: '#ff6347'}]}
          placeholder="Unavailable"
          editable={false}
          placeholderTextColor="#000000"
        />
      );
    }
  };
  return (
    <View style={[styles.card, cardStyle]}>
      {imageSource && (
        <View style={styles.cardImageContainer}>
          <Image
            source={imageSource}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>
      )}
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.divider} />
        <Text>{content}</Text>
      </View>
      <View style={styles.box2}>
        {renderTextInput()}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleView}>
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  rentConnectText: {
    fontSize: 45,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: '95%',
    // backgroundColor:'none' ,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 16,
    borderBlockColor: 'white',
  },
  searchInput: {
    height: 40,
    color: 'white',
  },

  card: {
    width: '48%',
    // flex: 1,
    borderWidth: 5,
    borderRadius: 5,
    // borderColor:'#928987',
    borderColor: '#000000',
    padding: 2,
    paddingBottom: 6,
    margin: 3.2,
    marginBottom: 15,
    //marginLeft:1,
    maxWidth: 200,
    height: 330,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cardImageContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  cardImage: {
    flex: 1,
    width: '100%',
    height: '70%',
    borderRadius: 2,
    // marginBottom: 2,
    resizeMode: 'contain',
  },
  content: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 1,
    color: 'black',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 35,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    width:150,
    backgroundColor: '#3cb371',
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize:20,
    fontWeight:'bold',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginLeft: 3,
    // marginRight: 3,
    marginBottom:5,
  },
  
  button: {
    backgroundColor: '#0000cd',
    height:35,
    padding: 5,
    width: 150,
    // marginTop: 5,
    borderRadius: 5,
    // marginLeft:5,
    // marginRight: 5,
    // marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  box2: {
    marginTop: 5,
    marginBottom: 5,
  },
});

