import { useState } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import { NAV_ITEMS } from './nav_items';

export const NavigationBar = () => {
  const [selected, setSelected] = useState(NAV_ITEMS[0].key);

  return (
    <div>
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
            onClick={() => setSelected(item.key)}
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
  );
};
