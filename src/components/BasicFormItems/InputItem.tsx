import { ReactNode } from 'react';
import { Form, FormRule, Input } from 'antd';
import { InputProps, PasswordProps, TextAreaProps } from 'antd/es/input';

export interface InputItemProps extends Omit<InputProps, 'name'> {
  name: string | number | (string | number)[];
  label?: string;
  hidden?: boolean;
  required?: boolean;
  rules?: FormRule[];
  help?: ReactNode;
}

export interface PasswordItemProps extends PasswordProps {
  name: string;
  label?: string;
  hidden?: boolean;
  required?: boolean;
  rules?: FormRule[];
  help?: ReactNode;
  dependencies?: string[];
}

export interface TextAreaItemProps extends TextAreaProps {
  name?: string;
  label?: string;
  hidden?: boolean;
  required?: boolean;
  rules?: FormRule[];
  help?: ReactNode;
}

const InnerInputItem = ({
  name,
  label,
  hidden = false,
  required = true,
  rules = [],
  help,
  ...restProps
}: InputItemProps) => {
  return (
    <Form.Item
      help={help}
      name={name}
      label={label}
      hidden={hidden}
      rules={[
        { required: required, message: `请输入${label}` },
        ...rules,
      ]}
    >
      <Input placeholder={`请输入${label}`} {...restProps} />
    </Form.Item>
  );
};

const PasswordItem = ({
  name,
  label,
  hidden = false,
  required = true,
  rules = [],
  help,
  dependencies,
  ...restProps
}: PasswordItemProps) => {
  return (
    <Form.Item
      help={help}
      name={name}
      label={label}
      hidden={hidden}
      rules={[
        { required: required, message: `请输入${label}` },
        ...rules,
      ]}
      dependencies={dependencies}
    >
      <Input.Password placeholder={`请输入${label}`} {...restProps} />
    </Form.Item>
  );
};

const TextAreaItem = ({
  name,
  label,
  hidden = false,
  required = true,
  rules = [],
  help,
  ...restProps
}: TextAreaItemProps) => {
  if (!name) {
    return <Input.TextArea placeholder={`请输入${label}`} {...restProps} />;
  }

  return (
    <Form.Item
      help={help}
      name={name}
      label={label}
      hidden={hidden}
      rules={[
        { required: required, message: `请输入${label}` },
        ...rules,
      ]}
    >
      <Input.TextArea placeholder={`请输入${label}`} {...restProps} />
    </Form.Item>
  );
};

InnerInputItem.Password = PasswordItem;

InnerInputItem.TextArea = TextAreaItem;

export const InputItem = InnerInputItem;
