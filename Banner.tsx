import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Banner = ({uri_img} : any) => {
  return (
    <View>
      <Image source={{uri : uri_img}} style = {[styles.khung, styles.img]} />
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({
    khung : {
        padding : 10, 
        borderRadius : 20,
    },
    img : {
        width : '100%',
        height : 200,
        borderRadius : 20,
    }
})