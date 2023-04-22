import { Popover, PopoverProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { UserInfo } from '../../data/interfaces/user';
import { useGet } from '../../service/core/useRequest';
import { UserPopoverCard } from './UserPopoverCard';

export interface UserPopoverProps extends PopoverProps {
  user: UserInfo | string;
}

export const UserPopover = ({
  user,
  children,
  ...restProps
}: UserPopoverProps) => {
  const [show, setShow] = useState(false);

  const username = useMemo(() => {
    if (typeof user === 'string') {
      if (user.startsWith('@')) {
        return user.substring(1);
      } else {
        return user;
      }
    } else {
      return null;
    }
  }, [user]);

  const { data, mutate } = useGet<UserInfo>(username ? `/api/v1/user/info/${username}` : null, {
    isPaused: () => !show,
  });

  useEffect(() => {
    if (show) {
      mutate();
    }
  }, [mutate, show]);

  const userInfo = typeof user === 'object' ? user : data;

  const content = useMemo(() => {
    return <UserPopoverCard user={userInfo} />;
  }, [userInfo]);

  return (
    <Popover
      arrow={false}
      overlayInnerStyle={{ padding: '0', overflow: 'hidden' }}
      content={content}
      onOpenChange={(open) => {
        setShow(open);
      }}
      {...restProps}
    >
      {children}
    </Popover>
  );
};
