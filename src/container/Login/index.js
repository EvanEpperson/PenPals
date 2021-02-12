import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  Keyboard,
} from 'react-native';
import Logo from '../../component/Logo/index'
import InputField from '../../component/index'
import globalStyle from '../../utility/styleHelper/globalStyle';
import { color } from '../..';
import {Button, Input, Image, Text} from 'react-native-elements';
import { LoginRequest } from '../../network';
import { keys, setAsyncStorage } from '../../asyncStorage';
import { setUniqueValue } from '../../utility/constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';




const Login = ({navigation}) => {
  // const globalState = useContext(Store)
  // const {dispatchLoaderAction} = globalState
  // const [showLogo,toggleLogo] =useState(true)

  const[credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const {email, password} = credentials

  onLoginPress = () => {
    if(!email){
      alert('email is required')
    }else if(!password){
      alert('password is required')
    }else{
      LoginRequest(email, password)
      .then((res)=>{      
        if(!res.additionalUserInfo){
          alert(res);
          return
        }
        setAsyncStorage(keys.uuid,res.user.uid)
        setUniqueValue(res.user.uid)
        navigation.replace('Dashboard')
      })
      .catch((err)=>{
        alert(err)
      })
    }
  }

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    })
  }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={50}>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <SafeAreaView>
            {/* <View style={[globalStyle.containerCentered]}>
          <Text style={{color: 'black'}}>Login Screen</Text>
        </View> */}
            <StatusBar style="auto" />
            <Image
              source={{
                uri:
                  "https://techcrunch.com/wp-content/uploads/2018/12/getty-messaging.jpg"
              }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 20,
              }}
            />
            <View style={styles.inputContainer}>
              <Input
                placeholder="Enter Email"
                value={email}
                autoFocus
                onChangeText={text => handleOnChange('email', text)}
              />
              <Input
                placeholder="Enter password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => handleOnChange('password', text)}
              />
              <Button
                containerStyle={styles.button}
                title="Login"
                onPress={() => onLoginPress()}
              />
              <Button
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: color.LIGHT_GREEN,
                }}
                style={styles.button}
                onPress={() => navigation.navigate('SignUp')}
                title="Sign Up"
              />
            </View>
          </SafeAreaView>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    );
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
