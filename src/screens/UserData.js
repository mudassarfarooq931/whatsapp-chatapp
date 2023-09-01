import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

const UserData = () => {
  const [apiData, setApiData] = useState('');

  const getApi = async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    let result = await fetch(apiUrl);
    result = result.json();
    setApiData(result);
    console.log('Api call ======================> ', result);
  };

  useEffect(() => {
    getApi();
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
    backgroundColor: 'gray',
  },
  userDataView: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserData;
