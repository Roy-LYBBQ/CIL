import useSWR, { Key, KeyedMutator } from 'swr';
import { message } from 'antd';
import { getAccessToken } from '@/common/access-token';

export interface useGetProps {
  key: string;
  token?: string;
}

// back end response type
export interface dataCarrier<T> {
  data: T;
  code: number;
  msg: string;
}

// front end swr type
export interface dataObject<T> {
  data?: T | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<dataCarrier<T>>;
}

const fetcher = async (url: RequestInfo, configs?: RequestInit, headers?: HeadersInit) => {
  const token = getAccessToken();

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'token': token ? `  ${token}` : '',
      ...headers,
    },
    ...configs,
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    message.error('发生错误,代码:' + res.status);
    throw error;
  }

  return res.json().then((data: dataCarrier<any>) => {
    if (data.code !== 0) {
      message.error(data.msg);
    }

    return data;
  });
};

export const useGet = <T>(
  key: Key,
  config?: {
    configs?: RequestInit;
    headers?: HeadersInit;
    onSuccess?: (data: T) => void;
  },
): dataObject<T> => {
  const { configs, headers, onSuccess } = config || {};
  const { data, error, mutate } = useSWR<dataCarrier<T>>(key ? [key, configs, headers] : null, fetcher, {
    onSuccess: (data) => onSuccess?.(data.data),
  });

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: (!!error || data?.code !== 200) && !(!error && !data),
    mutate,
  };
};

const universal =
  async <T>(method: string, url: RequestInfo, body?: Record<any, any>): Promise<dataCarrier<T>> => {
    const res = await fetcher(url, { body: body ? JSON.stringify(body) : undefined, method });

    return res;
  };

export const get = async <T = any>(url: RequestInfo) => {
  return await universal<T>('GET', url);
};

export const post = async <T = any>(url: RequestInfo, body: Record<any, any> = {}) => {
  return await universal<T>('POST', url, body);
};

export const del = async <T = any>(url: RequestInfo, body: Record<any, any> = {}) => {
  return await universal<T>('DELETE', url, body);
};

export const put = async <T = any>(url: RequestInfo, body: Record<any, any> = {}) => {
  return await universal<T>('PUT', url, body);
};

export const putFile = async (url: RequestInfo, file: File | Blob): Promise<dataCarrier<null> | null> => {
  const token = getAccessToken();
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-type': file.type,
      'Authorization': token ?? '',
    },
    body: file,
  });

  if (res.ok) {
    return {
      data: null,
      code: 0,
      msg: '上传成功',
    };
  } else {
    return {
      data: null,
      code: -1,
      msg: '上传失败',
    };
  }
};
