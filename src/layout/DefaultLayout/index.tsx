import { ReactElement } from 'react';
import { NavigationBar } from '@/layout/components/NavigationBar';
import { ToolBar } from '../components/ToolBar';

export const DefaultLayout = (page: ReactElement) => {
  return (
    <div className="flex">
      <div className="basis-[250px] flex-shrink-0 flex-grow-0">
        <NavigationBar />
      </div>
      <div className="main flex-1">
        {page}
      </div>
      <div className="basis-[300px] flex-shrink-0 flex-grow-0 text-center">
        <ToolBar />
      </div>
    </div>
  );
};
