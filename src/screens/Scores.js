import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const Scores = (props) => {

  const [scores, setScore] = useState([]);
  const [sorted, setOrder] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [record, addRecord] = useState({name: '', score: null});

  fetchData = () => {
    axios.get('https://top-scores-api.herokuapp.com/users')
      .then(response => {
        setScore(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  };

  useEffect(() => {
    fetchData()
  }, []);

  sortList = (list) => {
    if (sorted == true) {
      return _.orderBy(list, ['score'], ['desc'])
    } else {
      return scores
    }
  };

  onSubmit = (payload) => {
    axios.post('https://top-scores-api.herokuapp.com/users', payload)
  };

  const sortedList = sortList(scores);

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: 'whitesmoke'}}>
      <LinearGradient colors={['#FDC830', '#f37335']} style={{flex: 1}}>
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
                    onSubmit({name: record.name, score: parseInt(record.score)})
                    addRecord({name: '', score: ''});
                    fetchData();
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
            <View style={styles.score}>
              <Text style={[styles.textScore, {fontWeight: 'bold'}]}>Name</Text>
              <Text style={[styles.textScore, {fontWeight: 'bold'}]}>Score</Text>
            </View>
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
      </LinearGradient>
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
    borderColor:'indigo',
    borderWidth: 1,
    fontSize: 20,
    padding: 0,
    paddingLeft: 5,
  },
  modalWindow: {
    backgroundColor: '#FDC830',
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
    borderColor: 'indigo'
  },
  textScore: {
    fontSize: 20,
  },
  button:{
    borderWidth: 1,
    padding: 5,
    borderColor: 'indigo',
    borderRadius: 5,
  },
  active: {
    borderWidth: 1,
    padding: 5,
    borderColor: 'indigo',
    borderRadius: 5,
    backgroundColor: 'magenta'
  },
  buttonText: {
    fontSize: 20,
    color: 'indigo',
  },
});

export default Scores;
