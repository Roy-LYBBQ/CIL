import { Table } from 'antd';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useMemo } from 'react';
import { useGet } from '../../../service/core/useRequest';
import { BasicPaginationTableProps, Pagination } from '../type';
import { DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE } from '../../../common/consts';

export function BasicPaginationTable<T extends object>({
  url,
  getActions,
  columns,
  extraQueries,
  ...restProps
}: BasicPaginationTableProps<T>): JSX.Element {
  const router = useRouter();
  const { page, size } = router.query;

  if (String(Number(page)) !== page || String(Number(size)) !== size) {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: DEFAULT_FIRST_PAGE,
        size: DEFAULT_PAGE_SIZE,
      },
    });
  }

  const { data: d, isLoading, mutate } = useGet<Pagination<T>>(`${url}?${qs.stringify({
    page,
    size,
    ...extraQueries,
  })}`);

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
      dataSource={d?.list ?? []}
      pagination={{
        current: (Number(page) || 0) + 1,
        pageSize: (Number(size) || 20),
        total: d?.total ?? 0,
        onChange: (page, size) => {
          router.replace({
            pathname: router.pathname,
            query: {
              ...router.query,
              page: page - 1,
              size,
            },
          });
        },
      }}
    />
  );
}
