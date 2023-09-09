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
    project_id: string | undefined;
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

  type ProjectAPIKey = {
    _id: string;
    name: string;
    api_key: string;
    type: string;
    create_time: string;
    update_time: string;
  };

  type NewProjectAPIKeyUsingPostBody = {
    name: string;
    apikey_type: string;
  };

  type UpdateAPIKeyByProjectIdAPIKeyIdUsingPutBody = {
    name: string;
  };

  type DeleteMultipleFilesUsingDeleteBody = {
    file_ids: string[];
  };

  // Product
  type ProductsSearchUsingPostBody = {
    phrase: string;
    namespace: string;
  };

  type DoChaClientSideUsingPostBody = {
    question: string;
  };

  // Subscription
  type Subscription = {
    _id: string;
    user_id: string;
    subscription_plan_id: string;
    subscription_message_tracking_id: string;
    start_date: string;
    end_date: string;
    year_month: string;
    message_count: number;
    message_limit: number;
  };
}
