import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

const CustomHeader = props => {
  const {userId} = useSelector(state => state.auth);
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor={'#5DC357'} /> */}
      <View style={styles.leftSide}>
        <Text style={styles.logoText}>ChatPulse</Text>
      </View>
      <View style={styles.rightSide}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Feather
              name="camera"
              size={22}
              color={'white'}
              style={styles.icons}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather
              name="search"
              size={22}
              color={'white'}
              style={styles.icons}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onPressDots}>
            <Feather
              name="power"
              size={22}
              color={'white'}
              style={styles.icons}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3C73E9',
    // backgroundColor: 'red',
    flexDirection: 'row',
    height: '9%',
  },
  leftSide: {
    flex: 1.5,
    // backgroundColor : 'gray',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 25,
    color: 'white',
    marginHorizontal: 20,
  },
  rightSide: {
    flex: 1,
    // backgroundColor : 'pink',
    justifyContent: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginHorizontal:10
  },
  icons: {
    // backgroundColor : 'red'
  },
});
export default CustomHeader;
