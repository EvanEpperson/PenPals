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
import { deviceHeight, smallDeviceHeight } from '../../utility/styleHelper/appStyle';
import { StickyHeader } from '../../component';



const Dashboard = ({navigation}) => {
  const [getScrollPosition, setScrollPosition] = useState(0)
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

    ImagePicker.showImagePicker(option,(response) => {
      if  (response.didCancel) {
        console.log("user cancel image picker");
      } else if (response.error) {
        console.log("image picker error", response.error);
      } else {
        //base 64
        let source = 'data:image/jpeg;base64,'+response.data;
        console.log('response', JSON.stringify(response));
        check(PERMISSIONS.IOS.LOCATION_ALWAYS);
        UpdateUser(uuid, source)
        // check(PERMISSIONS.IOS.LOCATION_ALWAYS)
          .then(() => {
            setUserDetail({
              ...userDetail,
              profileImg: source,
            });
          })
          .catch(err => {
            alert(err);
          });
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


    // * on image tap makes it so that you can see the image on full screen

    const imgTaP = (profileImg, name) => {
      if(!profileImg){
        navigation.navigate('ShowFullImg', {
          name,
          imgText: name.charAt(0)
        })
      }
      else{
        navigation.navigate('ShowFullImg', {
          name,
          img: profileImg
        });
      }
    }

    // console.log(userDetail);
    // // console.log(allUsers[0].name);
    // console.log(name);

    const getOpacity = () => {
      if(deviceHeight > smallDeviceHeight){
        return deviceHeight/4
      }else{
        return deviceHeight/6
      }
    }

    return (
      <SafeAreaView style={(globalStyle.flex1, {backgroundColor: 'white'})}>
        {getScrollPosition > getOpacity() && (
          <StickyHeader
            name={name}
            img={profileImg}
            onImgTap={() => imgTaP(profileImg, name)}
          />
        )}
        <FlatList
          alwaysBounceVertical={false}
          data={allUsers}
          keyExtractor={(_, index) => index.toString()}
          onScroll={event =>
            setScrollPosition(event.nativeEvent.contentOffset.y)
          }
          ListHeaderComponent={
            <View
              style={{
                opacity:
                  getScrollPosition < getOpacity()
                    ? (getOpacity() - getScrollPosition) / 100
                    : 0,
              }}>
              <Profile
                name={name}
                img={profileImg}
                onEditImgTap={() => selectPhotoTapped()}
                onImgTap={() => imgTaP(profileImg, name)}
              />
            </View>
          }
          renderItem={({item}) => (
            <ShowUsers
              name={item.name}
              img={item.profileImg}
              onImgTap={() => imgTaP(item.profileImg, item.name)}
            />
          )}
        />
      </SafeAreaView>
    );
}

export default Dashboard

const styles = StyleSheet.create({})
