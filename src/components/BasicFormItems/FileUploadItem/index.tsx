import { Form } from 'antd';
import { FileUploadFormItem, ImageUploadFormItem, VideoUploadFormItem } from './BasicUpload/UploadItem';

export interface FileUploadItemProps {
  name: string | number | (string | number)[];
  fileName: string;
  required?: boolean;
}

export const ImageUploadItem = ({
  name,
  fileName,
  required = true,
}: FileUploadItemProps) => {
  return (
    <Form.Item
      name={name}
      label={`${fileName}文件`}
      rules={[{ required, message: `请上传${fileName}文件` }]}
    >
      <ImageUploadFormItem
        fileType="files"
        uploadingText={`正在上传${fileName}`}
        idleText={`上传${fileName}`}
        finishedText={`${fileName}上传成功`}
      />
    </Form.Item>
  );
};

export const VideoUploadItem = ({
  name,
  fileName,
  required = true,
}: FileUploadItemProps) => {
  return (
    <Form.Item
      name={name}
      label={`${fileName}文件`}
      rules={[{ required, message: `请上传${fileName}文件` }]}
    >
      <VideoUploadFormItem
        fileType="files"
        uploadingText={`正在上传${fileName}`}
        idleText={`上传${fileName}`}
        finishedText={`${fileName}上传成功`}
      />
    </Form.Item>
  );
};

export const FileUploadItem = ({
  name,
  fileName,
  required = true,
}: FileUploadItemProps) => {
  return (
    <Form.Item
      name={name}
      label={`${fileName}`}
      rules={[{ required, message: `请上传${fileName}` }]}
    >
      <FileUploadFormItem
        fileType="files"
        uploadingText={`正在上传${fileName}`}
        idleText={`上传${fileName}`}
        finishedText={`${fileName}上传成功`}
      />
    </Form.Item>
  );
};
