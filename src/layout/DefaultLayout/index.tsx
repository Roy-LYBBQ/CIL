import { ReactElement } from 'react';
import { NavigationBar } from '@/layout/components/NavigationBar';

export const DefaultLayout = (page: ReactElement) => {
  return (
    <div className="flex">
      <div className="basis-[250px] flex-shrink-0 flex-grow-0">
        <NavigationBar />
      </div>
      <div className="main">
        {page}
      </div>
    </div>
  );
};
