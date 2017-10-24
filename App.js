import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MusicList from './app/views/MusicList.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Music list</Text>
        <MusicList></MusicList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  },
  heading: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 26,
    fontWeight: 'bold',
    color: 'darkgray'
  }
});
