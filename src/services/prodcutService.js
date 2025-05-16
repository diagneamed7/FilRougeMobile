import axios from 'axios';

const BASE_URL = 'http://192.168.114.152:3000/produits';

export const getProductById = (id) => axios.get(`${BASE_URL}/products/${id}`);
export const getSimilarServices = (id) => axios.get(`${BASE_URL}/products/${id}/similar`);
