declare namespace API {
  // user
  type User = {
    _id?: string;
    googleId?: string;
    username?: string;
    email?: string;
    APIKey?: string;
    role?: string;
    avatar?: string;
  };

  type UserAPIKey = {
    _id?: string;
    name?: string;
    api_key: string;
    create_time?: string;
  };

  type NewAPIKeyUsingPostBody = {
    name: string;
  };

  type UpdateAPIKeyUsingPutBody = {
    name: string;
  };

  type IngestDataClientUsingPostBody = {
    project_id: string;
    url: string;
    provider: string;
  };

  // Project
  type Project = {
    _id?: string;
    name?: string;
    namespace?: string;
    top_k?: number;
    table_name?: string;
    create_time?: string;
  };

  type NewProjectUsingPostBody = {
    project_name: string;
  };

  type ProjectFileList = {
    _id?: string;
    filename?: string;
    provider?: string;
    source_link?: string;
    create_time?: string;
  };

  type ProjectTask = {
    _id?: string;
    provider?: string;
    status?: string;
    create_time?: string;
    is_deleted?: boolean;
  };

  // Product
  type ProductsSearchUsingPostBody = {
    phrase: string;
    namespace: string;
  };

  type DoChaClientSideUsingPostBody = {
    question: string;
  };
}
