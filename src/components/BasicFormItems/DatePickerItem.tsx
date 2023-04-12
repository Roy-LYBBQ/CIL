import { DatePicker, DatePickerProps, Form, FormRule } from 'antd';
import { ReactNode } from 'react';

export type DatePickerItemProps = DatePickerProps & {
  name: string;
  label?: string;
  required?: boolean;
  rules?: FormRule[];
  help?: ReactNode;
}

export const DatePickerItem = ({
  name,
  label,
  required = true,
  rules = [],
  help,
  ...restProps
}: DatePickerItemProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required: required, message: `请输入${label}` },
        ...rules,
      ]}
      help={help}
    >
      <DatePicker {...restProps} />
    </Form.Item>
  );
};
