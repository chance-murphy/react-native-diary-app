import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Styles';
import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBP68I0amDlh2dziWeHGwaqUYtM3FKwhts",
  authDomain: "hw-04-5d3fe.firebaseapp.com",
  databaseURL: "https://hw-04-5d3fe.firebaseio.com",
  projectId: "hw-04-5d3fe",
  storageBucket: "hw-04-5d3fe.appspot.com",
  messagingSenderId: "811603906260",
  appId: "1:811603906260:web:1cb14d2377375f6b897541"
};

export class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    let theList = [];
    this.labels = [
      {key: 'h', name: 'Home'},
      {key: 'w', name: 'Work'},
      {key: 's', name: 'School'}
    ];
    this.state = {
      entries: theList,
      labels: this.labels,
    }
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    this.entriesRef = db.collection('entries'); 
    this.entriesRef.get().then(queryRef=>{
      let newEntries = [];
      queryRef.forEach(docRef=>{
        let docData = docRef.data();
        let newEntry = {
          text: docData.text,
          timestamp: docData.timestamp.toDate(),
          key: docRef.id, 
          labels: docData.labels
        }
        newEntries.push(newEntry);
      })
      this.setState({entries: newEntries});
    });

    this.labelsRef = db.collection('labels');
    this.labelsRef.get().then(querRef=>{
      let newLabels = [];
      queryRef.forEach(docRef=>{
        let docData = docRef.data();
        let newLabel = {
          name: docData.text,
          key: docData.text.split(1),
        }
        newLabels.push(newLabel);
      })
      this.setState({labels: newLabels});
    })

  }

  addEntry(newEntry) {
    this.entriesRef.add(newEntry).then(docRef=> {
      newEntry.key = docRef.id;
      let newEntries = this.state.entries.slice(); // clone the list
      newEntries.push(newEntry);
      this.setState({entries: newEntries});
    })
  }

  deleteEntry(entryToDelete) {
    let entryKey = entryToDelete.key;
    this.entriesRef.doc(entryKey).delete().then(()=> {
      let newEntries = [];
      for (entry of this.state.entries) {
        if (entry.key !== entryKey) {
          newEntries.push(entry);
        }
      }
      this.setState({entries: newEntries});
    });
  }

  updateEntry(entryToUpdate) {
    let entryKey = entryToUpdate.key;
    this.entriesRef.doc(entryToUpdate.key).set({
      text: entryToUpdate.text,
      timestamp: entryToUpdate.timestamp,
      labels: entryToUpdate.labels
    }).then(() => {
      let newEntries = [];
      for (entry of this.state.entries) {
        if (entry.key === entryToUpdate.key) {
          newEntries.push(entryToUpdate);
        } else {
          newEntries.push(entry);
        }
      }
      this.setState({entries: newEntries});
    });
  }

  handleDelete(entryToDelete) {
    this.deleteEntry(entryToDelete);
  }

  handleEdit(entryToEdit) {
    this.props.navigation.navigate('Details', {
      entry: entryToEdit,
      mainScreen: this
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>My Diary</Text>
          <Button
            title='Edit Labels'
            onPress={() => {
              this.props.navigation.navigate('LabelList', {mainScreen: this});
            }}
          />
        </View>
        <View style={styles.bodyContainer}>
          <FlatList
            data={this.state.entries}
            renderItem={
              ({item}) => {
                return (
                  <View style={styles.bodyListItem}>
                    <View style={styles.bodyListItemLeft}>
                      <Text style={styles.bodyListItemDate}>{item.timestamp.toLocaleString()}</Text>
                      <Text style={styles.bodyListItemText}>{item.text}</Text>
                    </View>
                    <View style={styles.bodyListItemRight}>
                      <Button
                        title='Delete'
                        containerStyle={styles.mediumButtonContainer}
                        titleStyle={styles.mediumButtonTitle}
                        onPress={()=>{this.handleDelete(item)}}
                      />
                      <Button
                        title='Edit'
                        containerStyle={styles.mediumButtonContainer}
                        titleStyle={styles.mediumButtonTitle}
                        onPress={()=>{this.handleEdit(item)}}
                      />
                    </View>

                  </View>
                );
              }} 
          />
        </View>
        <View style={styles.footerContainer}>
          <Button
            title='Add Entry'
            onPress={() => {
              this.props.navigation.navigate('Details', {mainScreen: this});
            }}
          />
        </View>
      </View>
    );
  }

}