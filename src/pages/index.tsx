import React from 'react';
import { Button } from 'antd';
import { UserPopover } from '../components/UserPopover';

function Home() {
  return (
    <div>
      <UserPopover user="@By_Ha">
        <Button>
          测试用
        </Button>
      </UserPopover>
    </div>
  );
}

export default Home;
