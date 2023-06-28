declare namespace API {
  // Project
  type Project = {
    _id?: string;
    name?: string;
    namespace?: string;
    topK?: number;
    table_id: string;
  };
}
