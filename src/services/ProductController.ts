import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export async function productsSearchUsingPost(
  body: API.ProductsSearchUsingPostBody
) {
  return axios.post(`${BASE_URL}/products/search`, body);
}
