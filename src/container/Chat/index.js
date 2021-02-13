import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView ,TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { colors } from 'react-native-elements'
import globalStyle from '../../utility/styleHelper/globalStyle'
import styles from './styles'
import Icon from 'react-native-ionicons';
import { ChatBox } from '../../component'
import firebase from '../../firebase/config'
import ImagePicker from 'react-native-image-picker';
import {senderMsg, recieverMsg} from '../../network/messages/index';

const Chat = ({route, navigation}) => {
  const {params} = route
  const {name, img, imgText, guestUserId, currentUserId} = params
  const [msgValue, setMsgValue] = useState('')
  const [messeges, setMesseges] = useState([])
  

  console.log(messeges);

  useLayoutEffect (() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>
    })
  }, [navigation] )

  useEffect(() => {
    try {
      firebase
        .database()
        .ref('messeges')
        .child(currentUserId)
        .child(guestUserId)
        .on('value', (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child )=> {
            console.log(child);
            msgs.push({
              sendBy: child.val().messege.sender,
              recievedBy: child.val().messege.reciever,
              msg: child.val().messege.msg,
              img: child.val().messege.img,
            });
          });
          // console.log(msgs);
          setMesseges(msgs.reverse());
          // console.log(msgs);
        });
    } catch (error) {
      alert(error);
    }
  }, []);


  const handleSend = () => {
    setMsgValue('');
    if (msgValue) {
      senderMsg(msgValue, currentUserId, guestUserId, '')
        .then(() => {})
        .catch(err => alert(err));

      // * guest user

      recieverMsg(msgValue, currentUserId, guestUserId, '')
        .then(() => {})
        .catch(err => alert(err));
    }
  };
 
    const handleCamera = () => {
      const option = {
        storageOptions: {
          skipBackup: true,
        },
      };

      ImagePicker.showImagePicker(option, response => {
        if (response.didCancel) {
          console.log('user cancel image picker');
        } else if (response.error) {
          console.log('image picker error', response.error);
        } else {
          //base 64
          let source = 'data:image/jpeg;base64,' + response.data;   
              setMsgValue('');
              if (msgValue) {
                senderMsg(
                  msgValue,
                  currentUserId,
                  guestUserId,
                  source ,
                )
                  .then(() => {})
                  .catch(err => alert(err));

                // * guest user

                recieverMsg(
                  msgValue,
                  currentUserId,
                  guestUserId,
                  source,
                )
                  .then(() => {})
                  .catch(err => alert(err));
              }
        }
      });
    };





  const handleOnChange = (text) => {
    setMsgValue(text)
  }
// console.log(messeges);

  const imgTaP = (chatImg) => {
    navigation.navigate('ShowFullImg', {name, img: chatImg})
  }

  return (
    <SafeAreaView
      //makes the background black and then go to the styles page of chat and you can change the white background to something else
      style={[globalStyle.flex1, {backgroundColor: colors.black}]}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[globalStyle.flex1]}>
        <TouchableWithoutFeedback style={[globalStyle.flex1]} onPress={Keyboard.dismiss} >
          <>
          <FlatList
            inverted
            data={messeges}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <>
                {/* {console.log(messeges)}; */}
                <ChatBox
                  msg={item.msg}
                  userId={item.sendBy}
                  img={item.img}
                  onImgTap={() => imgTaP(item.img)}
                />
              </>
            )}
          />
          {/* sending messege/ */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              padding: 15,
            }}>
            <TextInput
              style={{
                //   put it to the bottom and give the text height 40
                bottom: 0,
                height: 40,
                flex: 1,
                // seperate the arrow and the text area
                marginRight: 15,
                // make the tex border transparent and the background grey
                borderColor: 'transparent',
                backgroundColor: '#ECECEC',
                // dont be so cramped
                padding: 10,
                // make the text color blue
                color: 'blue',
                borderRadius: 30,
              }}
              placeholder="Type Here"
              numberOfLines={10}
              inputStyle={styles.input}
              value={msgValue}
              onChangeText={text => handleOnChange(text)}
            />
            <TouchableOpacity>
              <Icon
                name="camera"
                size={24}
                color="#2B68E6"
                onPress={() => handleCamera()}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="send"
                size={24}
                color="#2B68E6"
                onPress={() => handleSend()}
              />
            </TouchableOpacity>
          </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Chat

// const styles = StyleSheet.create({})
