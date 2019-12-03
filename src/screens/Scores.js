import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import * as _ from 'lodash';
import Modal from "react-native-modal";

const Scores = (props) => {

  const [scores, setScore] = useState([{name: 'John', score: 40},
                    {name: 'Ringo', score: 10},
                    {name: 'Paul', score: 30},
                    {name: 'George', score: 40}]);
  const [sorted, setOrder] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [record, addRecord] = useState({name: '', score: null});

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
      <Modal isVisible={isVisible}>
        <View style={styles.modal}>
         <View style={styles.modalWindow}>
          <Text style={[styles.textScore, {textAlign: 'center', fontWeight: 'bold'}]}>
            Add a new entry
          </Text>
          <View style={styles.inputBox}>
            <Text style={styles.textScore}>
              Name:
            </Text>
            <TextInput
              onChangeText={text => addRecord({...record, name: text})}
              value={record.name}
              style={styles.inputText}/>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.textScore}>
              Score:
            </Text>
            <TextInput
              onChangeText={num => addRecord({...record, score: num})}
              value={record.score}
              keyboardType='numeric'
              style={styles.inputText}/>
          </View>
          <View style={styles.buttonBox}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVisible(false);
                addRecord({name: '', score: ''})}}>
              <Text style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVisible(false);
                console.log(scores);
                scores.push({name: record.name, score: parseInt(record.score)});
                console.log(scores);
                addRecord({name: '', score: ''});
              }}>
              <Text style={styles.buttonText}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
         </View>
        </View>
      </Modal>
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
        <Text style={[styles.textScore, {marginBottom: 20}]}>
          Score not listed?
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisible(true)}>
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
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonBox: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputText: {
    height: 40,
    width: '70%',
    borderColor:'lightgray',
    borderWidth: 1
  },
  modalWindow: {
    backgroundColor: 'whitesmoke',
    width: '80%',
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
  },
  score: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 5,
    borderColor: 'lightgray'
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
