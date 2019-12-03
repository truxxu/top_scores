import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'orange'}}>
      <View style={styles.body}>
        <Text style={styles.title}>
          Top Scores App
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default App;
