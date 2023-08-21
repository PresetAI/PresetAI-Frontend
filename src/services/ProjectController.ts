import axios from 'axios';
import { BASE_URL } from '@/config/domain';

export async function getProjectsUsingGet() {
  return axios.get(`${BASE_URL}/project/get_projects`, {
    withCredentials: true,
  });
}

export async function newProjectUsingPost(body: API.NewProjectUsingPostBody) {
  return axios.post(`${BASE_URL}/project/new_project`, body, {
    withCredentials: true,
  });
}

export async function getProjectByProjectIdUsingGet(
  projectId: string | undefined
) {
  return axios.get(`${BASE_URL}/project/get_project/${projectId}`, {
    withCredentials: true,
  });
}

export async function getProjectFileByProjectIdUsingGet(
  projectId: string | undefined
) {
  return axios.get(
    `${BASE_URL}/project/get_project_file_by_project_id/${projectId}`,
    {
      withCredentials: true,
    }
  );
}

export async function doChaClientSideUsingPost(
  project_id: string | undefined,
  body: API.DoChaClientSideUsingPostBody
) {
  return axios.post(`${BASE_URL}/project/do_chat_client/${project_id}`, body, {
    withCredentials: true,
  });
}

export async function ingestDataClientUsingPost(
  body: API.IngestDataClientUsingPostBody
) {
  return axios.post(`${BASE_URL}/project/ingest_data/client`, body, {
    withCredentials: true,
  });
}

export async function getTasksUsingGet(projectId: string | undefined) {
  return axios.get(`${BASE_URL}/project/get_tasks/${projectId}`, {
    withCredentials: true,
  });
}
