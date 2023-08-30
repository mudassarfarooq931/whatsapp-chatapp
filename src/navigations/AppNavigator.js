import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import Contacts from '../screens/Contacts';
import ForgotPassword from '../screens/ForgotPassword';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import SignleChat from '../screens/SignleChat';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initialRouteName, setInitialRouteName] = useState('');
  const {userId} = useSelector(state => state.auth);
  const fetchUserData = async () => {
    if (userId) {
      setInitialRouteName('Home');
    } else {
      setInitialRouteName('Login');
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaView backgroundColor={'#3C73E9'} style={{flex: 0}} />
      <SafeAreaView backgroundColor={'white'} style={{flex: 1}}>
        <Stack.Navigator
          initialRouteName={userId && userId !== '' ? 'Home' : 'Login'}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignleChat"
            component={SignleChat}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Contacts"
            component={Contacts}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppNavigator;
