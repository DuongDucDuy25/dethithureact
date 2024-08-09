import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({title,onPress} : any) => {
  return (
    <TouchableOpacity style= {styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        margin : 10
      },
      buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight : 'bold'
      },
})