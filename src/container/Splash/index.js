import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAsyncStorage, keys } from '../../asyncStorage'
import { setUniqueValue } from '../../utility/constants'

const Splash = ({navigation}) => {

    useEffect(() => {
        const redirect = setTimeout(()=> {
            getAsyncStorage(keys.uuid)
            .then((uuid)=>{
                if(uuid){
                    setUniqueValue(uuid)
                    navigation.replace('Dashboard')
                }else{
                    navigation.replace('Login')
                }
            })
            .catch((err)=>{
                console.log(err);
                navigation.replace('Login')
            })
        }, 500)
        return () => clearTimeout(redirect)
    }, [navigation])

    return (
        <SafeAreaView>
            <Text>Splash screen if i use it or not </Text>
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({})
