import { useState } from 'react';
import tmdb from '../api/tmdb';

const useTmdb = () => {

    const [results, setResults] = useState();
    const [configuration, setConfiguration] = useState();

    async function searchTmdb(query,filters) {

        let search =  '';
        if (filters[0].active)
            search = '/search/movie'
        else if(filters[1].active)
            search = '/search/tv'
        else if(filters[2].active)
            search = '/search/person'
        else search = '/search/multi'
        
        try {
            const response = await tmdb.get(search, {
                params: {
                    query,
                    include_adult: false,
                }
            });
            setResults(response.data.results);
        } catch (err) {
            console.log(err);
        }

        
    }

    async function configurationTmdb() {

        try {
            const response = await tmdb.get('/configuration', {
                params: {
                    
                }
            });
            setConfiguration(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return ([results, configuration,  searchTmdb, configurationTmdb]);
    
}

export default useTmdb;