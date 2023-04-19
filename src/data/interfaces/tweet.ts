import { UserInfo } from './user';

export interface Tweet {
    id: string;
    content: string;
    user: UserInfo;
    viewCount: number;
    images: string[];
    children: Tweet[];
    deleted: boolean;
    created: string;
    updated: string;
}
