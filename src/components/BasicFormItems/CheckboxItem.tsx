import { Form, Checkbox, Row, Col, FormItemProps } from 'antd';

export interface CheckboxOption {
  label: string;
  value: any;
}

export interface CheckboxItemProps {
  name?: string | number | (string | number)[];
  label?: string;
  options: CheckboxOption[];
  required?: boolean;
  onChange?: (value: any[]) => void;
  span?: number;
  value?: any[];
  itemProps?: FormItemProps;
}

export const CheckboxItem = ({
  name,
  label,
  options,
  required = true,
  onChange,
  span,
  value,
  itemProps,
}: CheckboxItemProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: `请选择${label}` }]}
      {...itemProps}
    >
      <Checkbox.Group
        value={value}
        onChange={(e) => onChange?.(e)}
      >
        <Row>
          {options.map(option => {
            if (span) {
              return (
                <Col key={option.value} span={span}>
                  <Checkbox value={option.value}>{option.label}</Checkbox>
                </Col>
              );
            }

            return (
              <Checkbox key={option.value} value={option.value}>{option.label}</Checkbox>
            );
          })}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );
};
