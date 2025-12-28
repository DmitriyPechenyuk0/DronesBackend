export interface UserCreate {
  email: string;
  password?: string;
  name: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
}