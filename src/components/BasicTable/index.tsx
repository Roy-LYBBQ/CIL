import { Table } from 'antd';
import { useMemo } from 'react';
import { useGet } from '../../service/core/useRequest';
import { BasicTableProps } from './type';

export function BasicTable<T extends object>({
  url,
  getActions,
  columns,
  ...restProps
}: BasicTableProps<T>): JSX.Element {
  const { data: d, isLoading, mutate } = useGet<T[]>(`${url}`);

  const actions = useMemo(() => {
    return getActions?.(mutate) ?? null;
  }, [getActions, mutate]);

  return (
    <Table<T>
      {...restProps}
      columns={[
        ...(columns ?? []),
        ...(actions ? [
          {
            title: '操作', render: actions,
          },
        ] : []),
      ]}
      loading={isLoading}
      dataSource={d ?? []}
      pagination={false}
    />
  );
}
