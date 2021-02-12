import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  TextInput,
  View,
  KeyboardAvoidingView,

} from 'react-native';
import Logo from '../../component/Logo/index';
import InputField from '../../component/index';
import globalStyle from '../../utility/styleHelper/globalStyle';
import {color} from '../..';
import {Button, Image, Text, Input} from 'react-native-elements';
// import SignUpRequest from '../../network/signup';
// import AddUser from '../../network/user'
import {SignUpRequest, AddUser} from '../../network'
import {setAsyncStorage, keys } from '../../asyncStorage';
import firebase from '../../firebase/config'
import { setUniqueValue } from '../../utility/constants';



const SignUp = ({navigation}) => {
    // const globalState = useContext(Store);
    // const {dispatchLoaderAction} = globalState;

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const {name, email, password, confirmPassword} = credentials;

  onLoginPress = () => {
    if (!name) {
      alert('Your Name is required');
    } else if (!email) {
      alert('email is required');
    } else if (!password) {
      alert('password is required');
    } else if (password !== confirmPassword) {
      alert('Passwords Do not match');
    } {
      SignUpRequest(email, password)
      .then((res) =>{
        if(!res.additionalUserInfo){
          alert(res);
          return
        }
        let uid = firebase.auth().currentUser.uid
        let profileImg = '';
        AddUser(name, email, uid, profileImg)
          .then(() => {
            setAsyncStorage(keys.uuid,uid);
            setUniqueValue(uid);
            navigation.replace('Dashboard')
          })
          .catch(err => alert(err));
      }).catch((err)=>{
      console.log(firebase.auth().currentUser);
      alert(err)})
    }
  };

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}>
      <SafeAreaView style={[globalStyle.flex1, {backgroundColor: 'white'}]}>
        <View style={[globalStyle.containerCentered]}>
          <Text style={{color: 'black'}}>Sign up screen</Text>
        </View>
        <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
          <Input
            placeholder="Enter Name"
            value={name}
            onChangeText={text => handleOnChange('name', text)}
          />
          <Input
            placeholder="email"
            value={email}
            onChangeText={text => handleOnChange('email', text)}
          />
          <Input
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => handleOnChange('password', text)}
          />
          <Input
            placeholder="Confirm password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={text => handleOnChange('confirmPassword', text)}
          />
          <Button title="Login" onPress={() => onLoginPress()} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: color.LIGHT_GREEN,
            }}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
