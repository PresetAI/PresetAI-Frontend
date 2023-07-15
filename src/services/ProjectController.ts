import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export async function getProjectsUsingGet() {
  return axios.get(`${BASE_URL}/project/get_projects`, {
    withCredentials: true,
  });
}

export async function newProjectUsingPost(
  body: API.NewProjectUsingPostBody | undefined
) {
  return axios.post(`${BASE_URL}/project/new_project`, body, {
    withCredentials: true,
  });
}
