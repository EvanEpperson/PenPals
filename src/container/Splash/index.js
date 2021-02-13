import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
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
        <Image
          source={require('../download.jpeg')}
          style={{
            width: 200,
            height: 200,
            borderRadius: 20,
          }}
        />
      </SafeAreaView>
    );
}

export default Splash

const styles = StyleSheet.create({})
