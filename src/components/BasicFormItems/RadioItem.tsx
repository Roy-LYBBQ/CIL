import { Col, Form, FormItemProps, Radio, Row } from 'antd';

export interface RadioOption {
  label: string;
  value: any;
}

export interface RadioItemProps {
  name?: string | number | (string | number)[];
  label?: string;
  options: RadioOption[];
  required?: boolean;
  onChange?: (value: any) => void;
  span?: number;
  value?: any;
  itemProps?: FormItemProps;
}

export const RadioItem = ({
  name,
  label,
  options,
  required = true,
  onChange,
  span,
  value,
  itemProps,
}: RadioItemProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: `请选择${label}` }]}
      {...itemProps}
    >
      <Radio.Group
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <Row>
          {options.map((option, index) => {
            if (span) {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Col key={option.value + name + label + index} span={span}>
                  <Radio value={option.value}>{option.label}</Radio>
                </Col>
              );
            }

            return (
              // eslint-disable-next-line react/no-array-index-key
              <Radio key={option.value + name + label + index} value={option.value}>{option.label}</Radio>
            );
          })}
        </Row>
      </Radio.Group>
    </Form.Item>
  );
};
