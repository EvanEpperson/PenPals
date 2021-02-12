import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {SafeAreaView, Alert, Text, View, FlatList, StyleSheet} from 'react-native';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import ImagePicker from 'react-native-image-picker';
import ShowUsers from '../../component/showUsers';
import firebase from '../../firebase/config';
// import {color} from '../../utility';
// import {Store} from '../../context/store';
// import {LOADING_STOP, LOADING_START} from '../../context/actions/type';
import {uuid, smallDeviceHeight} from '../../utility/constants';
import {clearAsyncStorage} from '../../asyncStorage';
// import {deviceHeight} from '../../utility/styleHelper/appStyle';
import {UpdateUser, LogOutUser} from '../../network';
import globalStyle from '../../utility/styleHelper/globalStyle';



const Dashboard = ({navigation}) => {
    const [userDetail, setUserDetail] = useState({
      id: '',
      name: '',
      profileImg: '',
    });
    console.log(userDetail);
    const [allUsers, setAllUsers] = useState([])
    const {name,profileImg} = userDetail

    useLayoutEffect(()=> {
        navigation.setOptions({
            // headerRight: () => (
            //     <SimpleLineIcons name='logout' size={26} color= 'black' style={{right: 10}}
            //     onPress={()=> Alert.alert('Logout', 'Are you sure you want to Logout', [
            //         {
            //             text: 'Yes',
            //             onPress: () =>  logout()
            //         },
            //         {
            //             text: 'No'
            //         } 
                    
            //     ], {cancelable:false})} />
            // )
        })
    },[navigation])


    useEffect(()=>{
        try {
            firebase.database()
            .ref('users')
            .on('value', (dataSnapShot) => {
                let users = []
                let currentUser = {
                    id: '',
                    name: '',
                    profileImg: ''
                }
                dataSnapShot.forEach((child)=>{
                    if(uuid === child.val().uuid){
                        currentUser.id = uuid
                        currentUser.name = child.val().name
                        currentUser.profileImg = child.val().profileImg
                    }else{
                        users.push({
                          id: child.val().uuid,
                          name: child.val().name,
                          profileImg: child.val().profileImg
                        });
                    }
                })
                    setUserDetail(currentUser)
                    setAllUsers(users)  
            })
        } catch (error) {
            alert(error)
        }

    }, [])

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
        <SafeAreaView style={globalStyle.flex1,{backgroundColor: 'white'}}>
            <FlatList 
                alwaysBounceVertical={false}
                data={allUsers}
                // keyExtractor={(_,index)=>index.toString()}
                // ListHeaderComponent={
                //     <Profile 
                //     // img={profileImg}
                //     // name={}
                //     />
                // }
                renderItem={({item})=>(
                    <ShowUsers
                    name={item.name}
                    img={item.profileImg}

                    />
                )}

            
            />
        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({})
