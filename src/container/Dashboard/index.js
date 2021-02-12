import React, { useLayoutEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { clearAsynStorage } from '../../asyncStorage';
import LogOutUser from '../../network/logout';

Icon.loadFont();

const Dashboard = ({navigation}) => {

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
                <SimpleLineIcon name='logout' size={26} color= 'black' style={{right: 10}}
                onPress={()=> Alert.alert('Logout', 'Are you sure you want to Logout', [
                    {
                        text: 'Yes',
                        onPress: () =>  logout()
                    },
                    {
                        text: 'No'
                    } 
                    
                ], {cancelable:false})} />
            )
        })

    },[navigation])

    const logout = () => {
        LogOutUser()
        .then(()=>{
            clearAsynStorage()
            .then(()=>{})
            .catch((err)=>alert(err))
            navigation.replace('Login')
        })
        .catch((err)=>alert(err))
    }

    return (
        <View>
            <Text>Dashboard</Text>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({})
