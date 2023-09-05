import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import Contacts from '../screens/Contacts';
// import ForgotPassword from '../screens/auth/ForgotPassword/ForgotPassword';
// import Home from '../screens/main/Home/Home';
import Profile from '../screens/Profile';
import SignleChat from '../screens/SignleChat';
import UserData from '../screens/UserData';
import {ForgotPassword, Home, Login, Register, Splash} from '../screens';

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
      <SafeAreaView style={{flex: 0, backgroundColor: '#3C73E9'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
          <Stack.Screen
            name="UserData"
            component={UserData}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppNavigator;
