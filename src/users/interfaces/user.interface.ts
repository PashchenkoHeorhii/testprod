export interface IUser {
  id: number | string;
  firstName: string;
  lastName: string;
  age: number;
  isStudent: boolean;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
}
