import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import useTmdb from '../hooks/useTmdb';

const HomeScreen = ({ navigation }) => {

  const [text, setText] = useState('');
  const [results, configuration, searchTmdb, configurationTmdb] = useTmdb();

  const [filters, setFilters] = useState([
    { id: 0, name: 'Movies', active: false },
    { id: 1, name: 'TV Shows', active: false },
    { id: 2, name: 'People', active: false }
  ]);

  function changeActive(id, idDesactive1, idDesactive2) {

    let activeStatus = [...filters];
    activeStatus[id].active = activeStatus[id].active === false ? true : false;
    activeStatus[idDesactive1].active = false;
    activeStatus[idDesactive2].active = false;
    setFilters(activeStatus);
    searchTmdb(text,filters);
  }

 

  useEffect(() => {
    configurationTmdb();
        if (filters[0].active)
          uri = 'poster_path'
        else if(filters[1].active)
          uri = 'poster_path'
        else if(filters[2].active)
          uri = 'profile_path'
        else uri = 'poster_path'
  }, []);



  return (
    <>
      <SearchBar
        value={text}
        onTextChange={(t) => setText(t)}
        onTextSubmit={(t) => searchTmdb(t,filters)}
      />
      <View style={styles.filterContainer}>
        <Filter
          results={filters[0]}
          onPress={() => changeActive(filters[0].id, filters[1].id, filters[2].id)}
        />
        <Filter
          results={filters[1]}
          onPress={() => changeActive(filters[1].id, filters[0].id, filters[2].id)}
        />
        <Filter
          results={filters[2]}
          onPress={() => changeActive(filters[2].id, filters[1].id, filters[0].id)}
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("Details", {
                  id: item.id,
                  media_type: item.media_type,
                  filters:filters,
                  configuration: configuration,
                })}
                style={styles.container}>
                <Image
                  style={styles.image}
                  source={{
                    uri: configuration.images.base_url + configuration.images.poster_sizes[2].concat(filters[2].active || (item.media_type == "person") ? item.profile_path : item.poster_path),
                  }}
                />
                <Text style={styles.movieTittle}>{[item.original_title].concat(item.name)}</Text>
              </TouchableOpacity>
            </>
          );
        }
        }
      />

    </>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    borderRadius: 10,
    marginTop: 20,
    width: 185,
    height: 277.5,
  },
  container: {
    backgroundColor: '#04041e',
    marginHorizontal: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    borderRadius: 20,
  },
  movieTittle: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;