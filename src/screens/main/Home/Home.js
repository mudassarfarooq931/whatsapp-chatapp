import React from 'react';
import {View} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CustomHeader from '../../../components/CustomHeader';
import TopTabNavigator from '../../../navigations/TopTabNavigator';
import {setUserData} from '../../../redux/slices/auth/auth-slice';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.auth);
  const gotoLogout = () => {
    dispatch(setUserData(''));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader onPressDots={gotoLogout} />
      <TopTabNavigator />
    </View>
  );
};

export default Home;
