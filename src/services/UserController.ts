import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export async function getCurrentUserUsingGet() {
  return axios.get(`${BASE_URL}/users/get_current_user`, {
    withCredentials: true,
  });
}

// export async function logoutUsingPost() {
//   return axios.post(`${BASE_URL}/users/logout`, {
//     withCredentials: true,
//   });
// }
