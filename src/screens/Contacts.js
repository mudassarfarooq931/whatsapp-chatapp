import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';

export default function Contacts({navigation}) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userId} = useSelector(state => state.auth);

  useEffect(() => {
    setLoading(true);
    const contactsRef = database().ref('users');
    contactsRef.once('value', snapshot => {
      const data = snapshot.val();
      const contactsArray = Object.values(data);
      setContacts(contactsArray);
      setLoading(false);
    });
  }, []);

  // console.log(userId, 'wecfwe');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIconView}
            onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back-outline" size={25} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.usernameView}>
            <Text style={[styles.usernameText, {color: 'white'}]}>
              Select Contacts
            </Text>
            {!loading && (
              <Text style={{color: 'white'}}>
                {contacts.length - 1} Contacts
              </Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
              <Feather name="search" size={20} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color={'white'}
                style={{}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        keyExtractor={item => item.uid}
        data={contacts}
        renderItem={({item}) => {
          return (
            <>
              {userId !== item.uid && (
                <TouchableOpacity
                  style={styles.chatContainer}
                  onPress={() =>
                    navigation.navigate('SignleChat', {
                      uid: item.uid,
                      profileImage: item.profileImage,
                      name: item.name,
                    })
                  }>
                  <View style={styles.imgView}>
                    {item?.profileImage && (
                      <Image
                        source={{uri: item?.profileImage}}
                        style={styles.userimg}
                      />
                    )}
                  </View>

                  <View style={styles.messageView}>
                    <Text style={styles.usernameText} numberOfLines={1}>
                      {item?.name}
                    </Text>
                    {/* <Text style={styles.msgText} numberOfLines={1}>{item.about}</Text> */}
                  </View>
                </TouchableOpacity>
              )}
            </>
          );
        }}
      />
      {loading && (
        <View
          style={{
            zIndex: 1000,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'red'}></ActivityIndicator>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    height: 60,
    backgroundColor: '#3C73E9',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'lightgray',
  },
  backIconView: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  usernameView: {
    flex: 2,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    marginHorizontal: 30,
  },

  usernameText: {
    fontSize: 18,
    // marginHorizontal: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    // backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
  },
  imgView: {
    // backgroundColor: 'red',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userimg: {
    height: 50,
    width: 50,
  },
  messageView: {
    flex: 2,
    // backgroundColor: 'orange',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  usernameText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  msgText: {
    fontSize: 15,
  },

  timeView: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
    // backgroundColor: 'gray'
  },
  timeText: {
    fontSize: 12,
  },
});
