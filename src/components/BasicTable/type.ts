import { ColumnsType } from 'antd/es/table';
import { TableProps } from 'antd';

export interface BasicTableProps<T> extends Omit<TableProps<T>, 'dataSource'> {
  url: string | null;
  getActions?: (mutate: () => void) => ColumnsType<T>[number]['render'];
}

export interface BasicPaginationTableProps<T> extends Omit<TableProps<T>, 'dataSource'> {
  url: string;
  getActions?: (mutate: () => void) => ColumnsType<T>[number]['render'];
  extraQueries?: Record<string, any>;
}

export interface Pagination<T> {
  current: number;
  list: T[];
  size: number;
  total: number;
  totalPage: number;
}
