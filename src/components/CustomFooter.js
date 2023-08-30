import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomFooter = () => {
  return (


    <View style={styles.footerBottom}>
      <TouchableOpacity>

        <Image
          source={require('../assets/images/mail.png')}
          style={styles.imgs}
        />
      </TouchableOpacity>

      <TouchableOpacity>

        <Image
          source={require('../assets/images/twitter.png')}
          style={styles.imgs}
        />
      </TouchableOpacity>

      <TouchableOpacity>

        <Image
          source={require('../assets/images/facebook.png')}
          style={styles.imgs}
        />
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({



  footerBottom: {
    flex: 1,
    marginVertical : 10,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  imgs: {
    height: 30,
    width: 30,
  },
});

export default CustomFooter;
