import axios from 'axios';
import { BASE_URL } from '@/config/domain';

export async function productsSearchUsingPost(
  body: API.ProductsSearchUsingPostBody | undefined
) {
  return axios.post(`${BASE_URL}/product/search`, body);
}
