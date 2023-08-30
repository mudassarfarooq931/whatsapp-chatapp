import {View, Text} from 'react-native';
import React from 'react';

const Status = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
      }}>
      <Text style={{flex: 1}}>Status</Text>
      <Text style={{flex: 1}}>Videos</Text>
    </View>
  );
};

export default Status;
