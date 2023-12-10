import { Roles } from "../enums/Roles";

export interface UserModel {
  userId: string;
  username: string;
  email: string;
  roles: Roles[];
  enabled: boolean;
}