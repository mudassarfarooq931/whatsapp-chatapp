import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
const UserData = () => {
  const [apiData, setApiData] = useState('');

  //   const fetchApiData = async () => {
  //     const url = 'https://jsonplaceholder.typicode.com/posts/1';
  //     let result = await fetch(url);
  //     result = await result.json();

  //     setApiData(result);
  //     console.log('userData ========= >', result);
  //   };

  const getDataFromApi = () => {
    const localUrl = 'http://192.168.18.130:5000/api/l';
    const headers = {};
    axios.get('', {headers: 'Auth'}).then(res => {
      setApiData(res.data);
      console.log('response ======= ', res.data);
    });
  };

  useEffect(() => {
    // fetchApiData();
    getDataFromApi();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.userDataView}>
        <Text>{apiData.userId}</Text>
        <Text>{apiData.id}</Text>
        <Text>{apiData.title}</Text>
        <Text>{apiData.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  userDataView: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default UserData;
