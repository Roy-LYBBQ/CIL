import React, { useMemo } from 'react';
import { Button, Modal, ModalProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Loading } from '@/components/Loading';
import { LOGO_URL } from '../../common/consts';

export interface BaiscModalProps extends ModalProps {
  loading?: boolean;
  title?: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * @example
 *    <BasicModal
 *      maskClosable={false}
 *      open={open}
 *      onCancel={() => setOpen(false)}
 *      loading
 *      title="创建你的账号"
 *      action={<Button size="large" shape="round">
 *        123
 *      </Button>}
 *    >
 *      test
 *    </BasicModal>
 */
export const BasicModal = ({
  children,
  loading = false,
  title,
  action,
  ...restProps
}: BaiscModalProps) => {

  const modalHeader = useMemo(() => {
    return (
      <div className="h-[50px] flex item-center justify-center mx-[10px]">
        <div className="basis-1/2" />
        <div className="shrink flex items-center">
          <Image
            src={LOGO_URL}
            alt="Typus logo"
            width={30}
            height={30}
          />
        </div>
        <div className="flex basis-1/2 items-center flex-row-reverse">
          <Button
            shape="circle"
            type="text"
            icon={<CloseOutlined />}
            size="large"
          />
        </div>
      </div>
    );
  }, []);

  const modalFooter = useMemo(() => {
    return (
      <>
        {action}
      </>
    );
  }, [action]);

  return (
    <Modal
      footer={null}
      closable={false}
      {...restProps}
    >
      {loading &&
        <div
          className="typus-modal-loading-container"
        >
          <Loading className="typus-modal-loading-icon" />
        </div>
      }
      {!loading && modalHeader}
      {!loading && <div className="typus-modal-main px-[32px] overflow-y-auto flex-1">
        {title &&
          <div className="my-[20px] text-[30px] font-bold">
            <span>{title}</span>
          </div>
        }
        {children}
      </div>}
      {!loading && <div className="mx-[32px] flex flex-col h-[100px] justify-center">
        {modalFooter}
      </div>}
    </Modal>
  );
};
