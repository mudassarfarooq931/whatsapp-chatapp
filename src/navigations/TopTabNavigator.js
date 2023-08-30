import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chats from '../screens/Chats';
import Status from '../screens/Status';
import Calls from '../screens/Calls';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      tabBarPosition="top"
      screenOptions={{
        tabBarLabelStyle: {fontSize: 16, color: '#fff', fontWeight: 'bold'},
        tabBarItemStyle: {},
        tabBarStyle: {backgroundColor: '#3C73E9',marginBottom: 0,},
        // tabBarAndroidRipple: { borderless: true },
        tabBarPressColor: '#3C73E9',
        
        swipeEnabled: true,
        
      }}
      style={{height: 50}}>
      <Tab.Screen
      style={{}}
        name="Chats"
        component={Chats}
        options={{tabBarLabel: 'Chats'}}
      />
      <Tab.Screen
        name="Status"
        component={Status}
        options={{tabBarLabel: 'Status'}}
      />
      <Tab.Screen
        name="Calls"
        component={Calls}
        options={{tabBarLabel: 'Calls'}}
      />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
