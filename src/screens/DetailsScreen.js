import React, { useEffect, useState } from 'react';
import ProgressCircle from 'react-native-progress-circle'
import { View, Text, StyleSheet, Image, } from 'react-native';
import tmdb from '../api/tmdb';

const DetailsScreen = ({ navigation, route, filters }) => {

  const [result, setResult] = useState({});
  const [image, setImage] = useState({});

  async function getResult(id, media_type) {

    try {
      const response = await tmdb.get(`/${media_type}/${id}`, {
        params: {
        
        }
      });
      setResult(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (route.params.filters[0].active)
    route.params.media_type = 'movie';
    if (route.params.filters[1].active)
    route.params.media_type = 'tv';
    if (route.params.filters[2].active)
    route.params.media_type = 'person';
    getResult(route.params.id, route.params.media_type);
  }, [])

  return (
    <>
      <Image
        style={styles.backdrop}
        source={{
          uri: route.params.configuration.images.base_url + route.params.configuration.images.backdrop_sizes[1].concat(route.params.media_type == "person" ? result.profile_path : result.backdrop_path),
        }} />
      <View style={styles.container}>
        <View>
          <Image
            style={styles.poster}
            source={{
              uri: route.params.configuration.images.base_url + route.params.configuration.images.backdrop_sizes[1].concat(route.params.media_type == "person" ? result.profile_path : result.poster_path),
            }} />
        </View>
        <View style={styles.container2}>
          <Text style={styles.tittle}>{route.params.media_type == 'movie' ? result.original_title : result.name}</Text>
          <ProgressCircle
            percent={result.vote_average * 10}
            radius={route.params.media_type == 'person' ? 0 : 40}
            borderWidth={10}
            color="#23c33c"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ textAlign: 'center', fontSize: 18 }}>{result.vote_average * 10 + '%'}</Text>
          </ProgressCircle>
          <Text  numberOfLines={18} style={styles.overview}>{route.params.media_type == 'person' ? result.biography : result.overview}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  overview: {
    textAlign: 'justify',
    marginRight: 20,
    marginTop: 10,
    marginBottom:10,
  },

  container: {
    flexDirection: "row",
    flex: 1,
  },
  container2: {
    height: 50,
    flexDirection: "column",
    flex: 1,

  },

  backdrop: {
    resizeMode: 'stretch',
    width: 435,
    height: 200,

  },
  poster: {

    borderRadius: 5,
    margin: 20,
    width: 120,
    height: 180,
  },
  tittle: {
    marginTop: 30,
    marginBottom: 10,
    color: "black",
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default DetailsScreen;