import React, { useLayoutEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

Icon.loadFont();

const Dashboard = ({navigation}) => {

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
                <SimpleLineIcon name='logout' size={26} color= 'black' style={{right: 10}}
                onPress={()=> Alert.alert('Logout', 'Are you sure you want to Logout', [
                    {
                        text: 'Yes',
                        onPress: () =>  alert('Logged Out')
                    },
                    {
                        text: 'No'
                    } 
                    
                ], {cancelable:false})} />
            )
        })

    },[navigation])

    return (
        <View>
            <Text>Dashboard</Text>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({})
