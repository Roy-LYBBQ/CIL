import React, { ReactNode } from 'react';
import { Button, Result } from 'antd';

export interface IErrorBoundaryProps {
  children: ReactNode;
}

export interface IErrorBoundaryState {
  hasCatchError: boolean;
}

export class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
  state = {
    hasCatchError: false,
  };

  constructor(props: IErrorBoundaryProps) {
    super(props);
  }

  componentDidCatch() {
    this.setState({
      hasCatchError: true,
    });
  }

  render() {
    if (!this.state.hasCatchError) {
      return this.props.children;
    }

    return (
      <Result
        status="500"
        title="500"
        subTitle="Oops! Something went wrong."
        extra={[
          <Button type="primary" key="refresh" onClick={() => {
            location.reload();
          }}>
            刷新
          </Button>,
          <Button type="primary" key="home" onClick={() => {
            location.href = '/';
          }}>
            返回首页
          </Button>,
        ]}
      />
    );
  }
}
