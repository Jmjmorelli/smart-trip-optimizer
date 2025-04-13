import axios from 'axios';

const API = axios.create({
  baseURL: 'http://54.82.218.249:3000/api',
});

export default API;
