import React from 'react';
import { TextInput as RNTextInput, View, Text, StyleSheet } from 'react-native';

const TextInput = ({ label, value, onChangeText, ...props } : any) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <RNTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
});

export default TextInput;
