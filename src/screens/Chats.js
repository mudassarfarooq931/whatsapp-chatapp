import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import CustomFloatingActionbutton from '../components/CustomFloatingActionbutton';
import {setInbox, setNewInbox} from '../redux/slices/chat/inbox-slice';
import {postRequestWithToken} from '../redux/api/api';

const Chats = ({navigation}) => {
  const {userId, authToken} = useSelector(state => state.auth);
  const {inboxes} = useSelector(state => state.inbox);
  const dispatch = useDispatch();

  const fetchInboxData = () => {
    database()
      .ref('users/' + userId + '/connection')
      .once('value', snapshot => {
        let arr = [];
        console.log(snapshot);
        snapshot.forEach(snap => {
          arr.push({
            name: snap.child('name').val(),
            profileImage: snap.child('profileImage').val(),
            uid: snap.child('uid').val(),
            lastMsgDateTime: snap.child('lastMsgDateTime').val(),
            lastMsg: snap.child('lastMsg').val(),
          });
        });
        dispatch(setInbox(arr));
        fetchInboxDataListener();
      });
  };

  const fetchInboxDataListener = () => {
    database()
      .ref('users/' + userId + '/connection')
      .on('child_changed', snap => {
        console.log('snapshot======inbox', snap);
        console.log(snap);
        const newObj = {
          name: snap.child('name').val(),
          profileImage: snap.child('profileImage').val(),
          uid: snap.child('uid').val(),
          lastMsgDateTime: snap.child('lastMsgDateTime').val(),
          lastMsg: snap.child('lastMsg').val(),
        };
        dispatch(setNewInbox(newObj));
      });
    database()
      .ref('users/' + userId + '/connection')
      .on('child_added', snap => {
        console.log('snapshot======child_added', snap);
        console.log(snap);
        const newObj = {
          name: snap.child('name').val(),
          profileImage: snap.child('profileImage').val(),
          uid: snap.child('uid').val(),
          lastMsgDateTime: snap.child('lastMsgDateTime').val(),
          lastMsg: snap.child('lastMsg').val(),
        };
        dispatch(setNewInbox(newObj));
      });
  };

  useEffect(() => {
    fetchInboxData();

    return () => {
      database()
        .ref('users/' + userId + '/connection')
        .off();
    };
  }, []);

  const onContactPress = () => {
    navigation.navigate('Contacts');
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.uid}
        data={inboxes}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={styles.chatContainer}
            onPress={() => {
              navigation.navigate('SignleChat', {
                uid: item.uid,
                profileImage: item.profileImage,
                name: item.name,
              });
            }}>
            <View style={styles.imgView}>
              <Image source={{uri: item.profileImage}} style={styles.userimg} />
            </View>

            <View style={styles.messageView}>
              <Text style={styles.usernameText} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.msgText} numberOfLines={1}>
                {item.lastMsg}
              </Text>
            </View>

            <View style={styles.timeView}>
              <Text style={styles.timeText}>{item.lastMsgDateTime}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <CustomFloatingActionbutton onPress={onContactPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding : 5,
    // borderRadius : 20,
  },
  chatContainer: {
    // margin : 10,
    flex: 1,
    // backgroundColor: 'pink',
    flexDirection: 'row',
    padding: 10,
    // borderBottomWidth :1 ,
    borderRadius: 0,
    // marginBottom : 7,
    // borderColor: '#3C73E9',
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
    // backgroundColor: 'aqua',
  },
  msgText: {
    fontSize: 15,
  },

  timeView: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
    // backgroundColor: 'gray',
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: 12,
  },
});

export default Chats;
