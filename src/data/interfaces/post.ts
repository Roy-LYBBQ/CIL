import { UserInfo } from './user';

export interface Post {
    id: string;
    title: string;
    content: string;
    viewCount: number;
    user: UserInfo;
    published: boolean;
    created: string;
    updated: string;
}
