import { Button, Form, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { BaseButtonModal } from '@/components/BasicButtonModal/type';
import { post } from '../../service/core/useRequest';

export const BasicButtonModal: <T>(props: BaseButtonModal<T>) => JSX.Element = ({
  url,
  formatter = (values) => values,
  children,
  modalForm,
  title,
  initialValues,
  onCancel,
  onFinish,
  ...restProps
}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        {...restProps}
      >
        {children}
      </Button>
      <Modal
        forceRender
        title={(initialValues ? '编辑' : '新建') + title}
        open={open}
        onCancel={() => {
          onCancel?.();
          setOpen(false);
        }}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          layout="vertical"
          onFinish={async (values) => {
            if (url) {
              const res = await post(url, formatter(values));

              if (res.code === 0) {
                message.success('操作成功');
                setOpen(false);
              }
            }

            onFinish?.(values);
          }}
          form={form}
        >
          {modalForm}
        </Form>
      </Modal>
    </>
  );
};
