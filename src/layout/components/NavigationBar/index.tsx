import { useEffect, useState } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { LOGO_URL } from '../../../common/consts';
import { NAV_ITEMS } from './nav_items';

export const NavigationBar = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(NAV_ITEMS[0].key);

  useEffect(() => {
    const { pathname } = router;
    const [, path] = pathname.split('/');

    const index = NAV_ITEMS.findIndex(item => item.path === `/${path}`);

    if (index !== -1) {
      setSelected(NAV_ITEMS[index].key);
    }
  }, [router]);

  return (
    <div className="l-0 t-0 fixed w-[230px] flex flex-col gap-[10px] px-[10px] overflow-y-auto h-[100vh]">
      <Image
        alt="logo"
        src={LOGO_URL}
        width={30}
        height={30}
        className="self-center pt-[20px]"
      />
      <div
        className="mt-[20px] flex flex-col gap-[10px] mb-[20px]"
      >
        {NAV_ITEMS.map(item => {
          const { Icon } = item;

          return (
            <Button
              type="text"
              key={item.key}
              shape="round"
              size="large"
              className={classNames(
                'flex items-center gap-[10px]',
                { 'font-bold': item.key === selected },
              )}
              onClick={() => router.push(item.path)}
            >
              <Icon
                className={classNames(
                  'text-2xl',
                  {
                    'stroke-[2.5]': item.key === selected,
                    'stroke-[1.5]': item.key !== selected,
                  },
                )}
              />
              {item.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
