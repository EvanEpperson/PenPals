import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {SafeAreaView, Alert, Text, View, FlatList, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ShowUsers from '../../component/showUsers';
import Profile from '../../component/profile';
import firebase from '../../firebase/config';
import {clearAsyncStorage, clearAsynStorage} from '../../asyncStorage';
import {UpdateUser, LogOutUser, LogoutUser} from '../../network';
import globalStyle from '../../utility/styleHelper/globalStyle';
import { uuid } from '../../utility/constants';



const Dashboard = ({navigation}) => {
    const [userDetail, setUserDetail] = useState({
      id: '',
      name: '',
      profileImg: '',
    });   

    const [allUsers, setAllUsers] = useState([])
    const {name, profileImg} = userDetail;
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
                <SimpleLineIcons name='logout' size={26} color= 'black' style={{right: 10}}
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


  useEffect(() => {
    try {
      firebase
        .database()
        .ref('users')
        .on('value', (dataSnapshot) => {
          let users = [];
          let currentUser = {
            id: '',
            name: '',
            profileImg: '',
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid){
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
              });
            }
          });
          // console.log(currentUser);
          // console.log(users);
          setUserDetail(currentUser);
          setAllUsers(users);

        });
    } catch (error) {
      alert(error);

    }
  }, []);
  // console.log(userDetail);
  // console.log(allUsers);

 
  const selectPhotoTapped = () => {
    const option = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(option, (response) => {
      if (response.didCancel) {
        console.log("user cancel image picker");
      } else if (response.error) {
        console.log("image picker error", response.error);
      } else {
        //base 64
        let source = "data:image/jpeg;base64;" + response.data;
        console.log('response', JSON.stringify(response));
        UpdateUser(uuid, source)
          .then(() => {
            setUserDetail({
              ...userDetail,
              profileImg: source,
            });
          })
          .catch((err) => alert(err));
      }
    });
  };
  // console.log(userDetail);

    const logout = () => {
        LogoutUser()
        .then(()=>{
            clearAsynStorage()
            .then(()=>{})
            .catch((err)=>alert(err))
            navigation.replace('Login')
        })
        .catch((err)=>alert(err))
    }


    // console.log(userDetail);
    // // console.log(allUsers[0].name);
    // console.log(name);

    return (
      <SafeAreaView style={(globalStyle.flex1, {backgroundColor: 'white'})}>
        <FlatList
          alwaysBounceVertical={false}
          data={allUsers}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <Profile
              name={name}
              img={profileImg}
              onEditImgTap={() => selectPhotoTapped()}
            />
          }
          renderItem={({item}) => (
            <ShowUsers
              name={item.name}
              img={item.profileImg}
              onNameTap={() => selectPhotoTapped()}
            />
          )}
        />
      </SafeAreaView>
    );
}

export default Dashboard

const styles = StyleSheet.create({})
