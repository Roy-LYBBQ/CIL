import { NextPage } from 'next';
import React, { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import antdTheme from '@/styles/antdTheme.json';
import NoSsr from '@/components/NoSsr';

import '@/styles/globals.css';
import { DefaultLayout } from '@/layout/DefaultLayout';

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
      theme={antdTheme}
    >
      <NoSsr>
        {getLayout(<Component {...pageProps} />)}
      </NoSsr>
    </ConfigProvider>
  );
}
