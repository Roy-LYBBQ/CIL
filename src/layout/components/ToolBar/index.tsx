import { Calendar } from './components/Calendar';

export const ToolBar = () => {
  return (
    <div className="px-[16px] overflow-y-auto max-h-[100vh]">
      <div className="my-[16px] flex flex-col gap-[16px]">
        <Calendar />
      </div>
    </div>
  );
};
