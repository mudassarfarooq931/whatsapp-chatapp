import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import database from '@react-native-firebase/database';
import CustomInputs from '../components/CustomInputs';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setUserData} from '../redux/slices/auth/auth-slice';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Abc1234@');
  const [error, setError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    let valid = true;

    if (email === '' || password === '') {
      setError(' Please enter email and password');
      valid = false;
    } else {
      setError('');
    }

    if (valid) {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          const userRef = database().ref(`users/${user?.user?.uid}`);
          console.log('dataArray = ==', userRef);
          userRef.once('value', snapshot => {
            const data = {
              email: snapshot.child('email').val(),
              name: snapshot.child('name').val(),
              profileImage: snapshot.child('profileImage').val(),
              uid: snapshot.child('uid').val(),
            };
            dispatch(setUserData(data));
            setIsLoading(false);
            navigation.navigate('Home');
            setEmail('');
            setPassword('');
          });
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            setError('Email address is invalid!');
          }

          if (error.code === 'auth/user-not-found') {
            setError('Wrong Email');
          }

          if (error.code === 'auth/wrong-password') {
            setError('Wrong Password!');
          }

          setIsLoading(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
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
            inputType={'email'}
          />

          <CustomInputs
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
            keyboardType={'default'}
            secureTextEntry={true}
            iconName={'lock-closed'}
          />

          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                color: '#3C73E9',
                fontWeight: 'bold',
                textAlign: 'right',
              }}
              onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot Password?{' '}
            </Text>
          </View>
          {error ? (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                textAlign: 'left',
              }}>
              {error}
            </Text>
          ) : null}
          <CustomButton label={'Login'} onPress={handleLogin} />
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerTop}>
            <Text style={styles.newUserText}>Are you a new user? </Text>
            <Text
              style={styles.signupLinkText}
              onPress={() => navigation.navigate('Register')}>
              Sign Up
            </Text>
          </View>
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

export default Login;
