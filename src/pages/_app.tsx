import { NextPage } from 'next';
import React, { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { ConfigProvider, theme } from 'antd';
import dayjs from 'dayjs';
import zhCN from 'antd/lib/locale/zh_CN';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import NoSsr from '@/components/NoSsr';
import antdTheme from '@/styles/antdTheme.json';
import { DefaultLayout } from '@/layout/DefaultLayout';

import '@/styles/globals.scss';
import 'tailwindcss/tailwind.css';

dayjs.extend(isLeapYear);

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || DefaultLayout;

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.darkAlgorithm,
        ...antdTheme,
      }}
      prefixCls="typus"
    >
      <NoSsr>
        {getLayout(<Component {...pageProps} />)}
      </NoSsr>
    </ConfigProvider>
  );
}
