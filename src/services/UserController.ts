import axios from 'axios';
import { BASE_URL } from '@/config/domain';

export async function getCurrentUserUsingGet() {
  return axios.get(`${BASE_URL}/user/get_current_user`, {
    withCredentials: true,
  });
}

// Create an API key
export async function newAPIKeyUsingPost(name: API.NewAPIKeyUsingPostBody) {
  return axios.post(`${BASE_URL}/user/new_api_key`, name, {
    withCredentials: true,
  });
}

export async function getAPIKeyUsingPost() {
  return axios.post(
    `${BASE_URL}/user/get_api_key`,
    {},
    {
      withCredentials: true,
    }
  );
}

export async function updateAPIKeyUsingPut(
  api_key_id: string,
  body: API.UpdateAPIKeyUsingPutBody
) {
  return axios.put(`${BASE_URL}/user/update_api_key/` + api_key_id, body, {
    withCredentials: true,
  });
}

export async function deleteAPIKeyUsingDelete(api_key_id: string | undefined) {
  return axios.delete(`${BASE_URL}/user/delete_api_key/${api_key_id}`, {
    withCredentials: true,
  });
}

// export async function logoutUsingPost() {
//   return axios.post(`${BASE_URL}/users/logout`, {
//     withCredentials: true,
//   });
// }
