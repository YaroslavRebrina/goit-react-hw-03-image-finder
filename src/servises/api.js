import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const AUTH__KEY = '34289096-f43b39d982cc213ccf995e824';

export const fetchImgs = async (query, page) => {
  console.log(page);
  const response = await axios.get(
    `/?q=${query}&page=1&key=${AUTH__KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  return response;
};
