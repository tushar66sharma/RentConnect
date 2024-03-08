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
} from 'react-native';


interface CustomCardProps {
  title: string;
  content: string;
  //children?: ReactNode;
  cardStyle?: object;
  imageSource?: ImageSourcePropType;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  title,
  content,
  cardStyle = {},
  imageSource,
}) => {
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
    height: 235,
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
});
