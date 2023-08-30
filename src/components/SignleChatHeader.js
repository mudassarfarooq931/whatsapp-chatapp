import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignleChatHeader({
  username,
  userImage,
  navigation,
  selectcontact,
  totalContact,
}) {
  return (
    <SafeAreaView style={{felx: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backIconView} onPress={navigation}>
            <Ionicons name="arrow-back-outline" size={25} color={'white'} />
            <Image
              source={{uri: userImage}}
              style={[
                styles.userimg,
                {borderWidth: 1, borderRadius: 100, borderColor: 'white'},
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.usernameView}>
            <Text style={styles.usernameText} numberOfLines={1}>
              {username}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
              <Ionicons name="videocam" size={25} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
              <Ionicons name="call" size={25} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
              <Entypo
                name="dots-three-vertical"
                size={25}
                color={'white'}
                style={{}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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

  userimg: {
    height: 35,
    width: 35,
    marginHorizontal: 5,
  },
  usernameView: {
    flex: 1,
    // backgroundColor: 'pink',
    justifyContent: 'center',
  },

  usernameText: {
    fontSize: 18,
    // marginHorizontal: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
