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

export async function getAPIKeyListByProjectIdUsingGet(projectId: string) {
  return axios.get(`${BASE_URL}/project/get_api_key_list/${projectId}`, {
    withCredentials: true,
  });
}

export async function newAPIKeyByProjectIdUsingPost(
  body: API.NewProjectAPIKeyUsingPostBody,
  projectId: string
) {
  return axios.post(`${BASE_URL}/project/new_api_key/${projectId}`, body, {
    withCredentials: true,
  });
}

export async function updateAPIKeyByProjectIdAPIKeyIdUsingPut(
  body: API.UpdateAPIKeyByProjectIdAPIKeyIdUsingPutBody,
  projectId: string,
  apiKeyId: string
) {
  return axios.put(
    `${BASE_URL}/project/update_api_key/${projectId}/${apiKeyId}`,
    body,
    {
      withCredentials: true,
    }
  );
}

export async function deleteAPIKeyByProjectIdAPIKeyIdUsingDelete(
  projectId: string,
  apiKeyId: string
) {
  return axios.delete(
    `${BASE_URL}/project/delete_api_key/${projectId}/${apiKeyId}`,
    {
      withCredentials: true,
    }
  );
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
  // return axios.post(`${BASE_URL}/project/do_chat_client/${project_id}`, body, {
  //   withCredentials: true,
  // });
  return fetch(`${BASE_URL}/project/do_chat_client/${project_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
}

export async function ingestDataUrlClientUsingPost(
  body: API.IngestDataClientUsingPostBody
) {
  return axios.post(`${BASE_URL}/project/ingest_data/url/client`, body, {
    withCredentials: true,
  });
}

export async function getTasksUsingGet(projectId: string | undefined) {
  return axios.get(`${BASE_URL}/project/get_tasks/${projectId}`, {
    withCredentials: true,
  });
}

export async function deleteMultipleFilesUsingDelete(
  projectId: string,
  body: API.DeleteMultipleFilesUsingDeleteBody | undefined
) {
  return axios.delete(
    `${BASE_URL}/project/delete_multiple_files/${projectId}`,
    {
      data: body,
      withCredentials: true,
    }
  );
}
