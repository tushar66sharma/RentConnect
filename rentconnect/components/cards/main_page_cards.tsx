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
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Order: {title:string;
    content:string;
    flag:boolean;
    imageSource?:ImageSourcePropType;
    email:string;
    quantity:number;
    name:string;
  };
};

interface CustomCardProps {
  title: string;
  content: string;
  flag:boolean;
  //children?: ReactNode;
  cardStyle?: object;
  imageSource?: ImageSourcePropType;
  email:string;
  name:string;
  quantity:number;
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
}) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [expanded, setExpanded] = useState(false);

  const handleCardPress = () => {
    setExpanded(!expanded);
  };


  const handleView = () => {
    Alert.alert(`View Button Clicked...${email}`);
    navigation.navigate('Order', {
      title,
      content,
      flag,
      email,
      quantity,
      imageSource,
      name,
    });
  };

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
      <View style={styles.box1}>
        <Text style={styles.name}>{name}</Text>
        {/* <View style={styles.divider} /> */}
        <View style={styles.title_qnt}>
        <Text style={styles.title}>Price: {title}</Text>
        <Text style={styles.qnt}>Qnt : {quantity}</Text>
        </View>
        {/* <View style={styles.divider} /> */}
        {/* <TouchableOpacity onPress={handleCardPress}>
          <Text style={styles.details_button}> Details</Text>
        </TouchableOpacity>
        {expanded && (
          <>
          <Text style={styles.content}>{content}</Text>
          </>)} */}
      </View>
      <View style={styles.box2}>
        {renderTextInput()}
        {flag ? (
          <TouchableOpacity style={styles.button} onPress={handleView}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.button, styles.disabledButton]}>
            <Text style={styles.buttonText}>View</Text>
          </View>
        )}
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
    // height:'60%',
    overflow: 'hidden',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  cardImage: {
    flex: 1,
    width:200,
    height:200,
    borderRadius: 2,
    // marginBottom: 2,
    resizeMode: 'contain',
  },
  content: {
    fontSize:16,
    color:'black',
    alignSelf:'center'
  },
  details_button:{
    fontSize:16,
    color:'blue',
    alignSelf:'center'
  },
  name:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    alignSelf:'center',

  },
  title_qnt:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:4,
    marginTop:4,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'black',
    marginLeft:4,
  },
  qnt:{
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'black',
    marginRight:8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom:4,
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
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
  box2: {
    marginTop: 5,
    marginBottom: 5,
  },
  box1:{
    width:'100%',
    // alignContent:'center',
    // alignItems:'center'
    
  }
});
