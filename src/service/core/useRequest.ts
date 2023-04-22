import useSWR, { Key, KeyedMutator, SWRConfiguration } from 'swr';
import { message } from 'antd';
import omit from 'lodash/omit';
import { getAccessToken } from '@/common/access-token';

export interface useGetProps {
  key: string;
  token?: string;
}

// back end response type
export interface dataCarrier<T> {
  data: T;
  code: number;
  message: string;
  success: boolean;
}

// front end swr type
export interface dataObject<T> {
  data?: T | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<dataCarrier<T>>;
}

const fetcher = async ({ url, configs, headers }: {
  url: RequestInfo;
  configs?: RequestInit;
  headers?: HeadersInit;
}) => {
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
      message.error(data.message);
    }

    return data;
  });
};

export const useGet = <T>(
  key: Key,
  config?: {
    configs?: RequestInit;
    headers?: HeadersInit;
  } & SWRConfiguration,
): dataObject<T> => {
  const { configs, headers } = config || {};
  const { data, error, mutate } = useSWR<dataCarrier<T>>(key ? { url: key, configs, headers } : null, fetcher, {
    ...omit(config, ['configs', 'headers']),
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
    const res = await fetcher({
      url: url,
      configs: {
        body: body ? JSON.stringify(body) : undefined,
        method,
      },
    });

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
      message: '上传成功',
      success: false,
    };
  } else {
    return {
      data: null,
      code: -1,
      message: '上传失败',
      success: false,
    };
  }
};
