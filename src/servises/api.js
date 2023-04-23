import axios from 'axios';

const AUTH__KEY = '34289096-f43b39d982cc213ccf995e824';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const per_page = 12;

export const fetchImgs = async (query, page) => {
  const response = await axios.get(
    `/?q=${query}&page=1&key=${AUTH__KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=${per_page}`
  );
  return response;
};
