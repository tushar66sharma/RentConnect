import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  OrderDetails_Page: {
    itemId: string;
    email: string;
  };
};


interface CustomCardProps {
  title: string;
  content: string;
  flag: boolean;
  cardStyle?: object;
  imageSource?: ImageSourcePropType;
  email: string;
  name: string;
  quantity: number;
  itemId: string;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  title,
  content,
  flag,
  cardStyle = {},
  imageSource,
  email,
  name,
  quantity,
  itemId,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleView = () => {
    navigation.navigate('OrderDetails_Page', {itemId,email});
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
      <View style={styles.box1}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.title_qnt}>
          <Text style={styles.title}>Price: {title}</Text>
          <Text style={styles.qnt}>Qnt: {quantity}</Text>
        </View>
      </View>
      <View style={styles.box2}>
        <Text
          style={[
            styles.availability,
            {backgroundColor: flag ? '#3cb371' : '#ff6347'},
          ]}>
          {flag ? 'Available' : 'Unavailable'}
        </Text>
        <TouchableOpacity
          style={[styles.button, !flag && styles.disabledButton]}
          onPress={flag ? handleView : undefined}
          disabled={!flag}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderWidth: 5,
    borderRadius: 5,
    borderColor: '#000000',
    padding: 2,
    paddingBottom: 6,
    margin: 3.2,
    marginBottom: 15,
    maxWidth: 200,
    height: 330,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cardImageContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    flex: 1,
    width: 200,
    height: 200,
    borderRadius: 2,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    alignSelf: 'center',
  },
  title_qnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'black',
    marginLeft: 4,
  },
  qnt: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'black',
    marginRight: 8,
  },
  availability: {
    height: 35,
    borderRadius: 8,
    padding: 5,
    width: 150,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#0000cd',
    height: 35,
    padding: 5,
    width: 150,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
  box2: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  box1: {
    width: '100%',
  },
});
