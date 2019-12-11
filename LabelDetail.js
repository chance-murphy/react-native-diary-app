import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Input, CheckBox } from 'react-native-elements';
import { styles } from './Styles';

export class LabelDetailScreen extends React.Component {


  constructor(props) {
    super(props);

    this.entryToUpdate = this.props.navigation.getParam('entry', undefined);
    this.mainScreen = this.props.navigation.getParam('mainScreen');

    this.isAdd = (typeof this.entryToUpdate === 'undefined');
    
    let initText = '';
    let initLabels = [];

    this.state = {
      inputText: initText,
      labels: initLabels
    }
  }

  handleSave = () => {
    let newEntry = {
      text: this.state.inputText,
      timestamp: new Date(Date.now()),
      labels: this.state.labels
    };
    let mainScreen = this.props.navigation.getParam('mainScreen');
    if (this.isAdd) {
      mainScreen.addEntry(newEntry);
    } else {
      newEntry.key = this.entryToUpdate.key;
      mainScreen.updateEntry(newEntry);
    }
    this.props.navigation.goBack();
  }

  handleLabelToggle = (labelToToggle) => {
    this.setState(prevState => {
      let theLabels = prevState.labels.slice();
      for (label of theLabels) {
        if (label.key === labelToToggle.key) {
          label.value = !label.value;
        }
      }
      return {labels: theLabels};
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Label Details</Text>
          </View>
        <View style={styles.detailsBodyContainer}>
          <View style={styles.detailsInputContainer}>
            <Input
              multiline={true}
              placeholder="What's new?"
              inputContainerStyle={styles.largeInput}
              containerStyle={{justifyContent: 'flex-start'}}
              value={this.state.inputText}
              onChangeText={(value)=>{this.setState({inputText: value})}}
            />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Button
            title='Cancel'
            containerStyle={styles.mediumButtonContainer}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Button
            title='Save'
            containerStyle={styles.mediumButtonContainer}
            onPress={this.handleSave}
          />
        </View>
      </View>
    );
  }

}