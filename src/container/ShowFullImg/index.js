import React, { Fragment, useLayoutEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import globalStyle from '../../utility/styleHelper/globalStyle';

const ShowFullImg = ({route, navigation}) => {

    const {params} = route;
    const {name, img, imgText} = params

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:<Text>{name}</Text>
        })
    }, [navigation])

    return (
        <Fragment>
            {img? (
                <Image source={{ uri: img }} style={[globalStyle.flex1]}
                resizeMode='cover' />
            ) : (
                <View style={[globalStyle.containerCentered, {backgroundColor: 'white'}]} >
                    <Text style={styles.text} >{imgText}</Text>
                </View>
            ) }
        </Fragment>
    )
}

const styles = StyleSheet.create({
    text:{
        color: 'white',
        fontSize: 200,
        fontWeight: 'bold',
    }
})


export default ShowFullImg
