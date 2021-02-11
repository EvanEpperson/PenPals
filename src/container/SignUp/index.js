import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const SignUp = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text onPress={()=>navigation.navigate('Dashboard')}>SignUp</Text>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
