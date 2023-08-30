import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import CustomInputs from '../components/CustomInputs';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import CustomStatusBar from '../components/CustomStatusBar';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    let valid = true;
    if (email === '') {
      setError(' Email is required');
      valid = false;
      // } else if (!email.includes('@')) {
      //   setError('Invalid Email');
      //   valid = false;
    } else {
      setError('');
    }
    if (valid) {
      setIsLoading(true);
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setIsLoading(false);
          navigation.navigate('Login');
          setEmail('');
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          }

          if (error.code === 'auth/user-not-found') {
            setError('Wrong Email');
          }

          setIsLoading(false);
        });
    }
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <CustomStatusBar />
      <ScrollView
        contentContainerStyle={{minHeight: '100%'}}
        style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/images/unnamed.png')}
            style={styles.logoImg}
          />
        </View>

        <View style={styles.formContainer}>
          <CustomInputs
            placeholder={'Email'}
            onChangeText={setEmail}
            value={email}
            keyboardType={'default'}
            iconName={'mail'}
          />
          {error ? (
            <Text
              style={{
                color: 'red',
                // marginBottom: 10,
                // marginHorizontal: 10,
                fontSize: 12,
                // backgroundColor : 'black',
                textAlign: 'left',
              }}>
              {error}
            </Text>
          ) : null}
          <CustomButton label={'Login'} onPress={handleReset} />
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerTop}>
            <Text style={styles.newUserText}>Please check your email</Text>
          </View>
          {/* <CustomFooter /> */}
        </View>
      </ScrollView>

      {isLoading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#3C73E9" />
          <Text style={{marginTop: 10}}>Loading...</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    // marginVertical : 10,
  },
  headerContainer: {
    flex: 0.3,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    height: 70,
    width: 70,
  },

  formContainer: {
    // backgroundColor : 'green',
    // justifyContent: 'center',
  },

  footerContainer: {
    flex: 1,
    marginTop: 10,
    // backgroundColor: 'powderblue',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerTop: {
    marginBottom: 20,
    // backgroundColor : 'red',
    flexDirection: 'row',
  },
  newUserText: {
    fontSize: 15,
  },
  signupLinkText: {
    fontSize: 16,
    color: '#3C73E9',
    fontWeight: 'bold',
    marginHorizontal: 3,
  },
  activityIndicatorContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(52, 52, 52, alpha)',
    backgroundColor: 'lightgray',
    // borderRadius: 20
  },
});

export default ForgotPassword;
