import axios from 'axios';
import { BASE_URL } from '@/config/domain';

export async function getUserSubscriptionUsingGet() {
  return axios.get(`${BASE_URL}/subscription/get_user_subscription`, {
    withCredentials: true,
  });
}
