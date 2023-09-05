import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

class Posts extends Component {
  state = {
    postText: '',
  };

  handlePost = () => {
    // Handle posting logic here
    alert(`Posted: ${this.state.postText}`);
    // Reset the post text input
    this.setState({postText: ''});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{uri: 'https://placekitten.com/50/50'}} // Replace with the user's profile picture
            style={styles.profileImage}
          />
          <Text style={styles.username}>Your Name</Text>
        </View>

        <TextInput
          style={styles.postInput}
          placeholder="What's on your mind?"
          multiline
          onChangeText={text => this.setState({postText: text})}
          value={this.state.postText}
        />

        <Image
          source={{uri: 'https://placekitten.com/400/200'}} // Replace with the selected image
          style={styles.postImage}
        />

        <TouchableOpacity onPress={this.handlePost} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  postButton: {
    backgroundColor: '#1877f2', // Facebook blue color
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Posts;
