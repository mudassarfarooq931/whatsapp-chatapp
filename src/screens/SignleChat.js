import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SignleChatHeader from '../components/SignleChatHeader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {setMessageNew, setMessages} from '../redux/slices/chat/chat-slice';

const img = {
  uri: 'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png',
};

const SignleChat = ({route, navigation}) => {
  let name = route.params.name;
  let uid = route.params.uid;
  let profileImage = route.params.profileImage;
  let dateTime = new Date().getTime();

  const dispatch = useDispatch();
  const {userId, userName, userProfile} = useSelector(state => state.auth);
  const {messages} = useSelector(state => state.chat);
  const [newMessage, setNewMessage] = useState('');
  const [textInputHeight, setTextInputHeight] = useState(70);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMessageObj = {
      body: newMessage,
      senderId: userId,
      sender: name,
      type: 'text',
      dateTime: dateTime,
    };
    // dispatch(setMessages([newMessageObj, ...messages]));
    setNewMessage('');

    const isChatRef = database()
      .ref('users/' + userId + '/connection/' + uid)
      .once('value', snapshot => {
        if (!snapshot.exists()) {
          database()
            .ref('users/' + userId + '/connection/' + uid)
            .set({
              name,
              uid,
              profileImage,
              lastMsgDateTime: dateTime,
              lastMsg: newMessage,
            });

          database()
            .ref('users/' + uid + '/connection/' + userId)
            .set({
              name: userName,
              uid: userId,
              profileImage: userProfile,
              lastMsgDateTime: dateTime,
              lastMsg: newMessage,
            });
        } else {
          database()
            .ref('users/' + userId + '/connection/' + uid)
            .transaction(snapshot => {
              const previusData = snapshot;
              if (!previusData) return snapshot;
              previusData.lastMsgDateTime = dateTime;
              previusData.lastMsg = newMessage;
              return previusData;
            });
          database()
            .ref('users/' + uid + '/connection/' + userId)
            .transaction(snapshot => {
              const previusData = snapshot;
              if (!previusData) return snapshot;
              previusData.lastMsgDateTime = dateTime;
              previusData.lastMsg = newMessage;
              return previusData;
            });
        }
      });

    const messageNode = `${userId}-${uid}`;
    const messageNode1 = `${uid}-${userId}`;
    database()
      .ref('messages')
      .child(messageNode)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          const usersRef = database().ref(`messages/${messageNode}`).push();
          usersRef.set(newMessageObj);
        } else {
          const usersRef = database().ref(`messages/${messageNode1}`).push();
          usersRef.set(newMessageObj);
        }
      });
  };

  useEffect(() => {
    getData();
    return () => {
      dispatch(setMessages([]));
      const messageNode = `${userId}-${uid}`;
      const messageNode1 = `${uid}-${userId}`;
      database()
        .ref('messages/' + messageNode)
        .off();
      database()
        .ref('messages/' + messageNode1)
        .off();
    };
  }, []);

  const getData = async () => {
    const messageNode = `${userId}-${uid}`;
    const messageNode1 = `${uid}-${userId}`;
    const usersRef = database().ref('messages/' + messageNode);
    usersRef.once('value', snapshot => {
      if (snapshot.exists()) {
        refGetData(usersRef);
        refGetDataListener(usersRef);
      } else {
        const usersRef1 = database().ref('messages/' + messageNode1);
        refGetData(usersRef1);
        refGetDataListener(usersRef1);
      }
    });
  };

  const refGetData = usersRef => {
    usersRef
      .orderByChild('dateTime')
      .limitToLast(10)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          let msgArr = [];
          snapshot.forEach(snap => {
            msgArr.unshift({
              body: snap?.child('body').val(),
              dateTime: snap?.child('dateTime').val(),
              senderId: snap?.child('senderId').val(),
              sender: snap?.child('sender').val(),
              type: snap?.child('type').val(),
            });
          });
          dispatch(setMessages(msgArr));
        }
      });
  };

  const refGetDataListener = usersRef => {
    usersRef.limitToLast(1).on('child_added', snapshot => {
      if (snapshot.exists()) {
        const msgObj = {
          body: snapshot.child('body').val(),
          dateTime: snapshot.child('dateTime').val(),
          senderId: snapshot.child('senderId').val(),
          sender: snapshot.child('sender').val(),
          type: snapshot.child('type').val(),
        };
        dispatch(setMessageNew(msgObj));
      }
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SignleChatHeader
        username={name}
        userImage={profileImage}
        navigation={() => navigation.navigate('Chats')}
      />

      <ImageBackground source={img} resizeMode="cover" style={{flex: 1}}>
        <FlatList
          style={styles.chatSection}
          data={messages}
          inverted
          renderItem={({item, index}) => {
            return (
              <View
                key={item.id}
                style={
                  userId === item.senderId
                    ? [styles.messageContainer, styles.sent]
                    : [styles.messageContainer, styles.received]
                }>
                <Text
                  style={[
                    styles.messageText,
                    {color: userId === item.senderId ? 'white' : 'black'},
                  ]}>
                  {item.body}
                </Text>
                <Text style={{color: 'red'}}>{item.dateTime}</Text>
              </View>
            );
          }}></FlatList>

        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.writeMessageMainview,
              {minHeight: 55},
              textInputHeight,
            ]}>
            <TouchableOpacity style={styles.iconContainer}>
              <Fontisto name="smiley" size={20} />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <TextInput
                multiline
                value={newMessage}
                onChangeText={setNewMessage}
                onContentSizeChange={e =>
                  setTextInputHeight(e.nativeEvent.contentSize.height)
                }
                placeholder="Write your message"
                style={styles.input}
              />
            </View>

            <View style={styles.fileAndCameraIconContainer}>
              <TouchableOpacity style={styles.attachFileIcon}>
                <Entypo name="attachment" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.camerIcon}>
                <Entypo name="camera" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#3C73E9',
              marginRight: 5,
              height: 50,
              width: 50,
              justifyContent: 'center',
              borderRadius: 25,
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={sendMessage}>
              <Ionicons name="send" size={25} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  chatSection: {
    flex: 1,
    padding: 10,
  },

  messageContainer: {
    maxWidth: '70%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  sent: {
    alignSelf: 'flex-end',
    // backgroundColor: '#dcf8c6',
    backgroundColor: '#3C73E9',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  writeMessageMainview: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 40,
    justifyContent: 'center',
  },
  iconContainer: {
    // backgroundColor: 'red',
  },
  inputContainer: {
    flex: 1,
    // backgroundColor: 'green',
    // justifyContent: 'center',
    marginHorizontal: 5,
    // alignItems: 'center',

    // borderRadius : 20,
    // borderWidth : 1,
  },
  input: {
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
    height: 40,
    lineHeight: 30,
  },
  fileAndCameraIconContainer: {
    flexDirection: 'row',
    // backgroundColor: 'pink'
  },
  attachFileIcon: {
    marginRight: 20,
  },

  camerIcon: {},
});

export default SignleChat;
