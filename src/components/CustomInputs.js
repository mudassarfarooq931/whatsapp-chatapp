import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';



const CustomInputs = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  iconName,
  inputMode,
  k


}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.inputContainer}>

      <View style={styles.labelContainer}>

        <Ionicons name={iconName} size={22} style={styles.icons} color={"#3C73E9"} />

      </View>


      <View style={styles.inputs}>
        <TextInput
        style={{fontSize: 16}}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          inputMode={inputMode}
          
        />
      </View>



      {secureTextEntry && (
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="#3C73E9"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    borderColor :'#3C73E9',
    height : 50,
  },
  inputs: {
    // backgroundColor: 'pink',
    flex: 1,
    justifyContent : 'center',
    paddingHorizontal :10,
    
  },
  labelContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icons: {
    // backgroundColor: 'aqua',
  },
});

export default CustomInputs;
