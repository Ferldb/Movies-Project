import axios from 'axios';

const apiKey = "fb3fd7d06cd0879a33910c41c5424d6c";

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params:{
        api_key : apiKey,
    }
  });
  