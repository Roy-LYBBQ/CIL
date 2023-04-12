import { ReactNode, useCallback, useEffect, useState } from 'react';
import { message, Upload, UploadProps } from 'antd';
import { uploadFile } from '@/service/requests/upload-file';

type CustomRequestOptions = Parameters<Exclude<UploadProps['customRequest'], undefined>>[0];

export enum UploadStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface BaseUploadProps extends UploadProps {
  children?: ReactNode;

  /**
   * 上传完成后回调
   * @param fileKey
   */
  afterUpload?: (url: string, filename: string) => (void | Promise<void>);
  uploadFailed?: (err: any) => void;
  onUploadStatusChange?: (status: UploadStatus) => void;
  fileType: string;
  fileSize?: number;
  restParams?: Record<string, string>;
}

export const BaseUpload = ({
  children,
  afterUpload,
  uploadFailed,
  onUploadStatusChange,
  fileType,
  fileSize,
  restParams,
  ...restProps
}: BaseUploadProps) => {
  const [status, setStatus] = useState(UploadStatus.IDLE);

  const handleUpload = useCallback(async ({ file }: CustomRequestOptions) => {
    if (!file || typeof file === 'string') {
      setStatus(UploadStatus.FAILED);
      return;
    }

    if (fileSize && file.size > fileSize * 1024 * 1024) {
      setStatus(UploadStatus.FAILED);
      message.error(`文件大小不能超过${fileSize}MB`);
      return;
    }

    try {
      const filename = file instanceof File ? file.name : 'file';
      const { url } = await uploadFile({
        file,
        fileType,
        ...restParams,
      });
      afterUpload?.(url, filename);
      setStatus(UploadStatus.SUCCESS);
    } catch (err: any) {
      message.error(typeof err === 'string' && err);
      uploadFailed?.(err);
      setStatus(UploadStatus.FAILED);
    }
  }, [fileSize, setStatus, fileType, restParams, afterUpload, uploadFailed]);

  useEffect(
    () => onUploadStatusChange?.(status),
    [status, onUploadStatusChange],
  );

  return (
    <Upload
      customRequest={async (...params) => {
        setStatus(UploadStatus.UPLOADING);
        await handleUpload(...params);
      }}
      fileList={[]}
      {...restProps}
    >
      {children}
    </Upload>
  );
};
