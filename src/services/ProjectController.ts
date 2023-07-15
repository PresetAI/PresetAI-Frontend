import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export async function newProjectUsingPost(
  body: API.NewProjectUsingPostBody | undefined
) {
  return axios.post(`${BASE_URL}/project/new_project`, body, {
    withCredentials: true,
  });
}
