import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export interface LoadingProps {
  className?: string;
}

export const Loading = ({
  className,
}: LoadingProps) => {
  return (
    <Spin
      style={{ display: 'block' }}
      indicator={
        <LoadingOutlined
          spin
          className={className}
        />
      }
    />
  );
};
