import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import * as _ from 'lodash';

const Scores = (props) => {

  const scores = [{name: 'John', score: 40},
                  {name: 'Ringo', score: 10},
                  {name: 'Paul', score: 30},
                  {name: 'George', score: 40}];

  // sortScores = () => {
  //   return _.orderBy(scores, ['score'], ['desc'])
  // };

  const [sorted, setOrder] = useState(false);

  sortList = (list) => {
    if (sorted == true) {
      return _.orderBy(list, ['score'], ['desc'])
    } else {
      return scores
    }
  };

  const sortedList = sortList(scores);

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: 'whitesmoke'}}>
      <View style={styles.body}>
        <Text style={styles.title}>
          Top Scores App
        </Text>
        <TouchableOpacity
          style={sorted ? styles.active : styles.button}
          onPress={() => sorted ? setOrder(false) : setOrder(true)}>
          <Text style={styles.buttonText}>
            Sort
          </Text>
        </TouchableOpacity>
        <ScrollView>
          {sortedList.map((score, index) => {
            return(
              <View style={styles.score} key={index}>
                <Text style={styles.textScore}>{score.name}</Text>
                <Text style={styles.textScore}>{score.score}</Text>
              </View>
            )
          })}
        </ScrollView>
        <Text style={styles.textScore}>
          Score not listed?
        </Text>
        <TouchableOpacity
          style={styles.button}>
          <Text style={styles.buttonText}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
  },
  score: {
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 5
  },
  textScore: {
    fontSize: 20,
  },
  button:{
    borderWidth: 1,
    padding: 5,
    borderColor: 'blue',
    borderRadius: 5,
  },
  active: {
    borderWidth: 1,
    padding: 5,
    borderColor: 'blue',
    borderRadius: 5,
    backgroundColor: 'lightblue'
  },
  buttonText: {
    fontSize: 20,
    color: 'blue',
  },
});

export default Scores;
