import { ReactElement } from 'react';
import { NavigationBar } from '@/layout/components/NavigationBar';

export const DefaultLayout = (page: ReactElement) => {
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <div className="main">
        {page}
      </div>
    </div>
  );
};
