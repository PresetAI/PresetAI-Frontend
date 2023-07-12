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
    topK?: number;
    table_id: string;
  };

  // Product
  type ProductsSearchUsingPostBody = {
    phrase: string;
    namespace: string;
  };
}
