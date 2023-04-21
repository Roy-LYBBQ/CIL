import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const REFRESH_INTERVAL = 1000;
const WEEK_DAYS_YOUBI = ['日', '月', '火', '水', '木', '金', '土'];
const WEEK_DAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

interface ProgressProps {
  progress: number;
  color: string;
}

interface DurationProgressProps {
  durationName: string;
  progress: number;
  color: string;
}

const Progress = ({
  progress,
  color,
}: ProgressProps) => {
  return (
    <div className="bg-[var(--FG-2)] rounded-[8px] overflow-hidden">
      <div className="h-[4px]" style={{ background: color, width: `${progress}%` }} />
    </div>
  );
};

const DurationProgress = ({
  durationName,
  progress,
  color,
}: DurationProgressProps) => {
  return (
    <div className="flex flex-col text-xs">
      <div className="flex justify-between">
        <div>{durationName}</div>
        <div className="font-bold">{progress.toFixed(1)}%</div>
      </div>
      <Progress progress={progress} color={color} />
    </div>
  );
};

export const Calendar = () => {
  const [, setRefresh] = useState(0);
  const date = dayjs();

  useEffect(() => {
    // update the component every second

    const interval = setInterval(() => {
      setRefresh((prev) => prev + 1);
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center py-[16px] bg-[var(--BG-3)] rounded-[12px]">
      <div className="w-[60%]">
        <div className="text-sm">{date.format('YYYY年 MM月')}</div>
        <div className="text-xl">{date.format('DD日')}</div>
        <div className="text-sm">{WEEK_DAYS[date.day()]}&lt;{WEEK_DAYS_YOUBI[date.day()]}&gt;</div>
      </div>
      <div className="flex-0 w-[40%] pr-[16px]">
        <DurationProgress
          durationName="今天"
          progress={date.diff(date.startOf('day'), 'second') / 86400 * 100}
          color="#f7796c"
        />
        <DurationProgress
          durationName="本月"
          progress={date.diff(date.startOf('month'), 'second') / date.daysInMonth() / 86400 * 100}
          color="#a1de41"
        />
        <DurationProgress
          durationName="今年"
          progress={date.diff(date.startOf('year'), 'second') / 86400 / (dayjs().isLeapYear() ? 366 : 365) * 100}
          color="#41ddde"
        />
      </div>
    </div>
  );
};
