import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import Logo from '../../component/Logo/index'
import InputField from '../../component/index'
import globalStyle from '../../utility/styleHelper/globalStyle';
import { color } from '../..';




const Login = ({navigation}) => {

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
      alert(JSON.stringify(credentials))
    }
  }

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    })
  }

    return (
      <SafeAreaView style={[globalStyle.flex1, {backgroundColor: 'white'}]}>
        <View style={[globalStyle.containerCentered]}>
          <Text style={{color: 'black'}}>testing this out </Text>
        </View>
        <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={text => handleOnChange('email', text)}
          />
          <TextInput
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => handleOnChange('password', text)}
          />
          <Button title="Login" onPress={()=>onLoginPress()} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: color.LIGHT_GREEN,
            }}
            onPress={() => navigation.navigate('SignUp')}>
            Sign Up{' '}
          </Text>
        </View>
        <Text onPress={() => navigation.navigate('SignUp')}>Login</Text>
      </SafeAreaView>
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})
