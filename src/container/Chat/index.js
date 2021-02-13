import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { color } from '../../utility/colors/index'
import globalStyle from '../../utility/styleHelper/globalStyle'

const Chat = ({navigation, route}) => {
  const {params} = route
  const {name, img, imgText, guestUserId, currentUserId} = params
  
  useLayoutEffect (() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>
    })
  }, [navigation] )

  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: colors.white}]} >
      <Text></Text>
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({})
