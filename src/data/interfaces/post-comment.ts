import { UserInfo } from './user';

export interface PostComment {
    id: string;
    postId: string;
    user: UserInfo;
    content: string;
    children: PostComment[];
    image: string;
    deleted: boolean;
    created: string;
    updated: string;
}
