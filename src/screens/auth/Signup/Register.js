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
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import CustomInputs from '../../../components/CustomInputs';
import CustomButton from '../../..//components/CustomButton';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import axios from 'axios';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const registerAuthentication = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        registerUser(user);
        navigation.navigate('Login');
        setName('');
        setEmail('');
        setPassword('');
        setIsLoading(false);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        }

        console.error(error);
        setIsLoading(false);
      });
  };

  const registerUser = user => {
    const usersRef = database().ref(`users/${user?.user?.uid}`);
    usersRef
      .set({
        name: name,
        email: email,
        uid: user?.user?.uid,
        profileImage: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
      })
      .then(() => {
        RegisterWithApi(user);
        console.log('Data set.');
      });
  };

  const RegisterWithApi = async user => {
    let res = await axios({
      method: 'POST',
      url: 'http://192.168.18.130:5000/api/signup',
      data: {
        firebase_uid: user?.user?.uid,
        name: name,
        email: email,
        password: password,
        deviceType: Platform.OS,
      },
    });
    console.log('res...api..', res);
  };

  const handleRegister = () => {
    let valid = true;

    if (name === '' || email === '' || password === '') {
      setError('Please fill all required fields');
      valid = false;
    } else if (!email.includes('@')) {
      setError('Invalid Email');
      valid = false;
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters');
      valid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,16}/.test(
        password,
      )
    ) {
      setError(
        'Password must be 8 to 16 characters and include at least one uppercase, one lowercase, one number, and one special character.',
      );
      valid = false;
    } else {
      setError('');
    }

    if (valid) {
      setIsLoading(true);
      registerAuthentication();
      // auth()
      //   .createUserWithEmailAndPassword(email, password)
      //   .then(user => {
      //     registerUser(user);
      //     navigation.navigate('Login');
      //     setName('');
      //     setEmail('');
      //     setPassword('');
      //     setIsLoading(false);
      //   })
      //   .catch(error => {
      //     if (error.code === 'auth/email-already-in-use') {
      //       setError('That email address is already in use!');
      //     }

      //     if (error.code === 'auth/invalid-email') {
      //       setError('That email address is invalid!');
      //     }

      //   console.error(error);
      //   setIsLoading(false);
      // })
      // .then(function (response) {
      // axios({
      //   method: 'POST',
      //   url: 'http://192.168.18.130:5000/api/signup',
      //   data: {
      //     firebase_uid: user?.user?.uid,
      //     name: name,
      //     email: email,
      //     password: password,
      //     deviceType: Platform.OS,
      //   },
      // });

      // console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      {/* <CustomStatusBar /> */}
      <ScrollView
        contentContainerStyle={{minHeight: '100%'}}
        style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../assets/images/unnamed.png')}
            style={styles.logoImg}
          />
        </View>

        <View style={styles.formContainer}>
          <CustomInputs
            placeholder={'Name'}
            onChangeText={setName}
            value={name}
            keyboardType={'default'}
            iconName={'person'}
            inputMode={'text'}
          />

          <CustomInputs
            placeholder={'Email'}
            onChangeText={setEmail}
            value={email}
            keyboardType={'default'}
            iconName={'mail'}
            inputMode={'email'}
          />

          <CustomInputs
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
            keyboardType={'default'}
            secureTextEntry={true}
            iconName={'lock-closed'}
          />

          {error ? (
            <Text
              style={{
                color: 'red',

                fontSize: 12,

                textAlign: 'justify',
              }}>
              {error}
            </Text>
          ) : null}
          <CustomButton label={'Register'} onPress={handleRegister} />
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerTop}>
            <Text style={styles.newUserText}>Already a user? </Text>
            <Text
              style={styles.signupLinkText}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
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

export default Register;
