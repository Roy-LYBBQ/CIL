import { Gender } from '../enums/gender';

export interface UserInfo {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  banner: string;
  email: string;
  description: string;
  role: number;
  gender: Gender;
  created: string;
  updated: string;
}
