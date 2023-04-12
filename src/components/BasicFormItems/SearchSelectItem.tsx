import { Form, Select, SelectProps } from 'antd';
import { useState, useMemo } from 'react';
import { useGet } from '@/service/core/useRequest';

export interface SearchSelectItemProps<K extends number | string> extends SelectProps<any, any> {
  name?: string | number | (string | number)[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: K) => void;
  allowClear?: boolean;
  getUrl: (value: string) => string | null;
  dataTransformer: (data: any) => { label: string; value: string }[];
}

export const SearchSelectItem: <K extends number | string> (props: SearchSelectItemProps<K>) => JSX.Element = ({
  name,
  label,
  required = true,
  disabled,
  onChange,
  allowClear = false,
  getUrl,
  dataTransformer,
  ...restProps
}) => {
  const [search, setSearch] = useState<string | null>(getUrl(''));
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  useGet(search, {
    onSuccess(data) {
      setOptions(dataTransformer(data));
    },
  });

  const select = useMemo(() => {
    return (
      <Select
        allowClear={allowClear}
        showSearch
        onSearch={(keyword) => {
          setSearch(getUrl(keyword));
        }}
        filterOption={false}
        onChange={onChange}
        disabled={disabled}
        placeholder={`请选择${label}`}
        onSelect={() => {
          setSearch('');
        }}
        options={options}
        {...restProps}
      />
    );
  }, [allowClear, disabled, getUrl, label, onChange, options, restProps]);

  if (!name) {
    return select;
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: `请选择${label}` }]}
      getValueProps={(value) => {
        if (!value) {
          return {};
        }
        return {
          value: options.find((option) => option.value === value),
        };
      }}
    >
      {select}
    </Form.Item>
  );
};
