import { Form, InputNumber, InputNumberProps } from 'antd';

export interface InputItemProps extends InputNumberProps {
  name: string;
  label: string;
  required?: boolean;
}

export const InputNumberItem = ({
  name,
  label,
  required = true,
  ...restProps
}: InputItemProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: `请输入${label}` }]}
    >
      <InputNumber {...restProps} placeholder={`请输入${label}`} />
    </Form.Item>
  );
};
