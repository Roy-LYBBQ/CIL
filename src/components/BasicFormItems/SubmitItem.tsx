import { Button, Form } from 'antd';

export interface SubmitItemProps {
  buttonText?: string;
}

export const SubmitItem = ({
  buttonText = '提交',
}: SubmitItemProps) => {
  return (
    <Form.Item>
      <Button htmlType="submit" type="primary">{buttonText}</Button>
    </Form.Item>
  );
};
