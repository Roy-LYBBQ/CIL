import { useMemo, useState } from 'react';
import { Button, ButtonProps, Image, message, Space } from 'antd';
import { BaseUpload, UploadStatus } from '../';

export interface UploadFormItemProps {
  fileType: string;
  buttonProps?: ButtonProps;
  value?: string;
  onChange?: (value: string, filename: string) => void;
  showDelete?: boolean;
  uploadingText: string;
  idleText: string;
  finishedText: string;
  deleteText?: string;
  restParams?: Record<string, string>;
  accept?: string;
  breakLine?: boolean;
  showSuccessMessage?: boolean;
}

type RenderUploadButtonParams =
  Pick<UploadFormItemProps, 'buttonProps' | 'uploadingText' | 'idleText' | 'finishedText'>
  & { status: UploadStatus };

const renderUploadButton = ({
  status,
  buttonProps,
  uploadingText,
  idleText,
  finishedText,
}: RenderUploadButtonParams) => {
  return (
    <Button
      loading={status === UploadStatus.UPLOADING}
      disabled={status === UploadStatus.UPLOADING}
      {...buttonProps}
    >
      {(() => {
        if (status === UploadStatus.UPLOADING) {
          return uploadingText;
        }

        if (status === UploadStatus.IDLE) {
          return idleText;
        }

        if (status === UploadStatus.SUCCESS) {
          return finishedText;
        }
        return buttonProps?.children || 'Upload';
      })()}
    </Button>
  );
};

export const ImageUploadFormItem = ({
  value,
  onChange,
  buttonProps,
  uploadingText,
  idleText,
  finishedText,
  showDelete = true,
  deleteText = '删除',
  fileType,
  restParams,
  accept = 'image/*',
}: UploadFormItemProps) => {
  const [innerValue, setInnerValue] = useState<string>(value || '');
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);

  const uploadBody = useMemo(() => {
    return (
      <BaseUpload
        fileSize={20}
        accept={accept}
        fileType={fileType}
        onUploadStatusChange={(status) => {
          setStatus(status);
        }}
        afterUpload={(url, filename) => {
          onChange?.(url, filename);
          setInnerValue(url);
        }}
        restParams={restParams}
      >
        {renderUploadButton({ status, buttonProps, idleText, uploadingText, finishedText })}
        {showDelete && (
          <Button
            danger
            type="link"
            disabled={!value}
            onClick={(e) => {
              setInnerValue('');
              onChange?.('', '');
              e.stopPropagation();
            }}
          >
            {deleteText}
          </Button>
        )}
      </BaseUpload>
    );
  }, [
    accept,
    buttonProps,
    deleteText,
    fileType,
    finishedText,
    idleText,
    onChange,
    restParams,
    showDelete,
    status,
    uploadingText,
    value,
  ]);

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      {value && <Image src={innerValue} alt="" />}
      {uploadBody}
    </Space>
  );
};

export const VideoUploadFormItem = ({
  value,
  onChange,
  buttonProps,
  uploadingText,
  idleText,
  finishedText,
  showDelete = true,
  deleteText = '删除',
  fileType,
  restParams,
  accept = 'video/*',
}: UploadFormItemProps) => {
  const [innerValue, setInnerValue] = useState<string>(value || '');
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);

  const uploadBody = useMemo(() => {
    return (
      <BaseUpload
        fileSize={1024 * 10}
        accept={accept}
        fileType={fileType}
        onUploadStatusChange={(status) => {
          setStatus(status);
        }}
        afterUpload={(url, filename) => {
          onChange?.(url, filename);
          setInnerValue(url);
        }}
        restParams={restParams}
      >
        {renderUploadButton({ status, buttonProps, idleText, uploadingText, finishedText })}
        {showDelete && (
          <Button
            danger
            type="link"
            disabled={!value}
            onClick={(e) => {
              setInnerValue('');
              onChange?.('', '');
              e.stopPropagation();
            }}
          >
            {deleteText}
          </Button>
        )}
      </BaseUpload>
    );
  }, [
    accept,
    buttonProps,
    deleteText,
    fileType,
    finishedText,
    idleText,
    onChange,
    restParams,
    showDelete,
    status,
    uploadingText,
    value,
  ]);

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      {value && <video
        src={innerValue}
        style={{ width: '100%' }}
        controls
      />}
      {uploadBody}
    </Space>
  );
};

export const FileUploadFormItem = ({
  value,
  onChange,
  buttonProps,
  uploadingText,
  idleText,
  finishedText,
  showDelete = true,
  deleteText = '删除',
  fileType,
  restParams,
  accept,
  breakLine = true,
  showSuccessMessage = false,
}: UploadFormItemProps) => {
  const [innerValue, setInnerValue] = useState<string>(value || '');
  const [innerFilename, setInnerFilename] = useState<string>(value || '');
  const [status, setStatus] = useState<UploadStatus>(value ? UploadStatus.SUCCESS : UploadStatus.IDLE);

  return (
    <Space style={breakLine ? { width: '100%', overflow: 'hidden' } : {}} direction="vertical">
      {value && <Button type="link" href={innerValue}>{innerFilename}</Button>}
      <BaseUpload
        accept={accept}
        fileType={fileType}
        onUploadStatusChange={(status) => {
          if (value && status == UploadStatus.IDLE) {
            return;
          }

          setStatus(status);
        }}
        afterUpload={(url, filename) => {
          if (showSuccessMessage) {
            message.success('上传成功');
          }

          onChange?.(url, filename);
          setInnerValue(url);
          setInnerFilename(filename);
        }}
        restParams={restParams}
      >
        {renderUploadButton({ status, buttonProps, idleText, uploadingText, finishedText })}
        {showDelete && (
          <Button
            danger
            type="link"
            disabled={!value}
            onClick={(e) => {
              setInnerValue('');
              onChange?.('', '');
              e.stopPropagation();
            }}
          >
            {deleteText}
          </Button>
        )}
      </BaseUpload>
    </Space>
  );
};
