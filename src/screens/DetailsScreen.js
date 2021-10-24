import React, { useEffect, useState } from 'react';
import { Text, StyleSheet,} from 'react-native';
import SearchBar from '../components/SearchBar';
import tmdb from '../api/tmdb';

const DetailsScreen = ({ navigation, route }) => {

    const [movie,setMovie] = useState({});
    const [image,setImage] = useState({});

    async function getMovie(id) {
 
        try {
          const response = await tmdb.get(`/movie/${id}`,{
            params: {
              include_adult: false,
            }
          });
          setMovie(response.data);
        } catch (err) {
          console.log(err);
        }
      }

      async function searchImage(id) {

        try {
            const response = await tmdb.get(`/movie/${id}/images`, {
                params: {
                    movie_id: id,
                }
            });

            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMovie(route.params.id);
        searchImage(route.params.id);
    },[])

  return (
    <>
        <Text>{movie.original_title}</Text>
    </>
  );
}

const styles = StyleSheet.create({});

export default DetailsScreen ;