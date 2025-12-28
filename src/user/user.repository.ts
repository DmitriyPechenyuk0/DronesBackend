import { UserCreate, UserResponse } from './user.types';

export class UserRepository {
  async findByEmail(email: string): Promise<UserResponse | null> {
    return null; 
  }

  async save(userData: UserCreate): Promise<UserResponse> {
    return {
      id: "uuid-12345",
      email: userData.email,
      name: userData.name
    };
  }
}