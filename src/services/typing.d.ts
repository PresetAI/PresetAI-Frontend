declare namespace API {
  // user
  type User = {
    id?: string;
    googleId?: string;
    username?: string;
    email?: string;
    APIKey?: string;
    role?: string;
    avatar?: string;
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
    top_k: number;
  };

  type ProjectFileList = {
    _id?: string;
    filename?: string;
    provider?: string;
    source_link?: string;
    create_time?: string;
  };

  // Product
  type ProductsSearchUsingPostBody = {
    phrase: string;
    namespace: string;
  };
}
