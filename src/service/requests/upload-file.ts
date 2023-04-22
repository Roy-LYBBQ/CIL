import dayjs from 'dayjs';
import qs from 'qs';
import { get, putFile } from '../core/useRequest';

interface SignUrl {
  key: string;
  url: string;
}

const getSignUrl = async ({
  filename,
  fileType,
  ...restParams
}: {
  filename: string;
  fileType: string;
  [key: string]: string;
}) => {
  const query = qs.stringify({
    folder: fileType,
    ...restParams,
  });

  const res =
    await get<SignUrl>(`/api/file/upload/url?${query}&fileName=${encodeURIComponent(filename)}`);

  const { key, url } = res?.data ?? {};

  return {
    key: key ?? '',
    url: url ?? '',
  };
};

const upload2Cloud = async (url: string, file: File | Blob) => {
  const res = await putFile(url, file);

  if (res?.code !== 0) {
    throw new Error('上传失败' + res?.message);
  }
};

const getFileUrl = async ({
  key,
}: {
  key: string;
}): Promise<string> => {
  const res = await get<string>(`/api/file/download/url?key=${encodeURIComponent(key)}`);
  return res?.data ?? '';
};

export const uploadFile = async ({
  file,
  fileType,
  ...restParams
}: {
  file: File | Blob;
  fileType: string;
  [key: string]: any;
}): Promise<{ url: string }> => {
  const filename = file instanceof File ? file.name : 'file';
  const filenameArray = filename.split('.');
  let finalFilename = '';
  if (filenameArray.length === 0) {
    finalFilename = dayjs().format('YYYY-MM-DDTHH-mm-ss-ms-') + String(Math.random()).substring(2);
  } else {
    filenameArray.splice(filenameArray.length - 1, 0,
      dayjs().format('YYYY-MM-DDTHH-mm-ss-ms-') + String(Math.random()).substring(2));
    finalFilename = filenameArray.join('.');
  }

  const { key, url } = await getSignUrl({
    filename: finalFilename,
    fileType,
    ...restParams,
  });

  if (!key || !url) {
    throw new Error('Get Sign Url and Key failed');
  }

  await upload2Cloud(url, file);

  const fileUrl = await getFileUrl({
    key,
  });
  return {
    url: fileUrl,
  };
};
