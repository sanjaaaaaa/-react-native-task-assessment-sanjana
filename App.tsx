import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { PostListScreen } from './screens/PostListScreen';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appContainer}>
        <PostListScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  appContainer:{
    flex: 1,
    overflow: 'hidden',
  },
});

export default App;

