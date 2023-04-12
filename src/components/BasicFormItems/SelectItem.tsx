import { Form, Select, SelectProps } from 'antd';
import { useState, useMemo } from 'react';

export interface SelectItemProps<K extends number | string, T> extends SelectProps<any, any> {
  mapper: Record<K, T>;
  name?: string | number | (string | number)[];
  label?: string;
  required?: boolean;
  omit?: K[];
  pick?: K[];
  disabled?: boolean;
  onChange?: (value: K) => void;
  allowClear?: boolean;
  hidden?: boolean;
}

export const SelectItem: <K extends number | string> (props: SelectItemProps<K, string>) => JSX.Element = ({
  mapper,
  name,
  label,
  required = true,
  omit,
  pick,
  disabled,
  onChange,
  allowClear = false,
  hidden = false,
  ...restProps
}) => {
  const [search, setSearch] = useState('');

  const select = useMemo(() => {
    const pickString = pick?.map((key) => key.toString()) ?? [];
    const omitString = omit?.map((item) => item.toString()) ?? [];

    return (
      <Select
        allowClear={allowClear}
        showSearch
        onSearch={setSearch}
        filterOption={false}
        onChange={onChange}
        disabled={disabled}
        placeholder={`请选择${label}`}
        onSelect={() => {
          setSearch('');
        }}
        options={Object.entries(mapper)
          .filter(([key]) => !omitString.includes(key))
          .filter(([key]) => pickString.length === 0 || pickString.includes(key))
          .filter(([, value]) => (value as string).includes(search))
          .map(([key, value]) => {
            return {
              label: value,
              value: Number(key) || key,
            };
          })}
        {...restProps}
      />
    );
  }, [allowClear, disabled, label, mapper, omit, onChange, pick, restProps, search]);

  if (!name) {
    return select;
  }

  return (
    <Form.Item
      hidden={hidden}
      name={name}
      label={label}
      rules={[{ required: required, message: `请选择${label}` }]}
      getValueProps={(value) => {
        if (!value) {
          return {};
        }
        return {
          value: {
            label: (mapper as any)[value],
            value: value,
          },
        };
      }}
    >
      {select}
    </Form.Item>
  );
};
