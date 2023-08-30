import {StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const CustomFloatingActionbutton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <MaterialIcons name="message" size={30} color={'white'} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 55,
    height: 55,
    borderRadius: 27,
    backgroundColor: '#3C73E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomFloatingActionbutton