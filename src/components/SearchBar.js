import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({onTextChange, onTextSubmit, value}) => {
    return (
      <View style={styles.container}>
        <Ionicons name="search" size={30} color="black" />
        <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Type your search here..."
            style={styles.searchBar}
            value={value}
            onChangeText={newText => onTextChange(newText)}
            onEndEditing={()=>onTextSubmit(value)}
            />
      </View>
    );
  }

  const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightgray',
        margin: 10,
        alignItems: 'center', 
      },
      searchBar:{
          fontSize:20,
          flex:1,
          marginLeft: 5,
      }
  });

  export default SearchBar;