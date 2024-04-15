export interface Data {
  docs: User[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: number;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  age: number;
  status: string;
  rol: string;
  matchs: string[];
  notifications: string[];
  createdAt: string;
  updatedAt: string;
}
