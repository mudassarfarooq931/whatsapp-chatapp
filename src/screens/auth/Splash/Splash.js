import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    return () => Splash.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/unnamed.png')}
        style={styles.logoImg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    height: 90,
    width: 90,
  },
});

export default Splash;
