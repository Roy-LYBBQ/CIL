import { ButtonProps } from 'antd';

export interface BaseButtonModal<T> extends Omit<ButtonProps, 'title'> {
  url?: string;
  formatter?: (values: Record<T extends object ? keyof T : any, any>) => T;
  title?: React.ReactNode;
  modalForm?: React.ReactNode;
  initialValues?: Record<any, any>;
  onCancel?: () => void;
  onFinish?: (values?: T) => void;
}
