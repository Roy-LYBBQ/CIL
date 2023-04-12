import { Col, Row } from 'antd';

export interface BasicDescriptionItem {
  title: string;
  description?: React.ReactNode;
}

export interface BasicDescriptionProps {
  descriptions: BasicDescriptionItem[];
}

export const BasicDescription = ({
  descriptions,
}: BasicDescriptionProps) => {
  const config = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 8,
    xxl: 6,
  };

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
      {descriptions.map((item) => (<Col key={item.title} {...config}>
        <Row>
          <Col span={8} style={{ color: '#777', wordBreak: 'break-all' }}>
            {item.title}：
          </Col>
          <Col span={16} style={{ wordBreak: 'break-all' }}>
            {item?.description}
          </Col>
        </Row>
      </Col>))}
    </Row>
  );
};
