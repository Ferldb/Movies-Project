import React, {useState}  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';


const Filter = ({ results, onPress }) => {

    let style = [styles.filter].concat(results.active ? [styles.filterSelected] : [])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => onPress()}>
                <Text style={style}> {results.name} </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    filter: {
        color: 'black',
        width: 85,
        textAlign: 'center',
        margin: 5,
        padding: 5,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 30,
    },

    filterSelected: {
        fontWeight: 'bold',
        backgroundColor: '#3873c1',
        color: 'white',
        borderColor: '#3873c1',
    }
})

export default Filter;