import { IconType } from 'react-icons';
import { TbCloud, TbHome, TbTimeline } from 'react-icons/tb';

export interface NavItem {
  key: string;
  title: string;
  Icon: IconType;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: 'timeline',
    title: '时间线',
    Icon: TbHome,
    path: '/',
  },
  {
    key: 'post',
    title: '帖子',
    Icon: TbTimeline,
    path: '/post',
  },
  {
    key: 'drive',
    title: '网盘',
    Icon: TbCloud,
    path: '/drive',
  },
];
