import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Input, CheckBox } from 'react-native-elements';
import { styles } from './Styles';
import { db } from './Main';

export class LabelListScreen extends React.Component {

  constructor(props) {
    super(props);

    // this.labels = [
    //   {key: 'h', name: 'Home'},
    //   {key: 'w', name: 'Work'},
    //   {key: 's', name: 'School'}
    // ];
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
    // let entryKey = entryToUpdate.key;
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
            <Text style={styles.headerText}>Label Details</Text>
          </View>
        <View style={styles.detailsBodyContainer}>
          <View style={styles.detailsLabelsContainer}>
            <FlatList
              data={this.labels}
              renderItem={({item})=>{
                return(
                    <View style={styles.labelListItem}>
                    <View style={styles.labelListItemLeft}>
                        <Text style={styles.labelSelectText}>{item.name}</Text>
                    </View>
                    <View style={styles.labelListItemRight}>
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
        </View>
        <View style={styles.footerContainer}>
          <Button
            title='Add Label'
            containerStyle={styles.mediumButtonContainer}
            onPress={() => {
              this.props.navigation.navigate('LabelDetails', {mainScreen: this});
            }}
          />
        </View>
      </View>
    );
  }

}