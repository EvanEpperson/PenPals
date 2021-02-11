import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

const Login = ({navigation}) => {
    return (
        <SafeAreaView>
            <Text onPress={()=>navigation.navigate('SignUp')}>Login</Text>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({})
