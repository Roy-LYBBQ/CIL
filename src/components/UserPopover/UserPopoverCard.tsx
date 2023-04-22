import { UserInfo } from '../../data/interfaces/user';
import { Loading } from '../Loading';

export interface UserPopoverCardProps {
  user?: UserInfo;
}

export const UserPopoverCard = ({
  user,
}: UserPopoverCardProps) => {

  return (
    <div
      className="w-[300px]"
    >
      {!user && <Loading className="h-[78px]" />}
      {user && <>
        <div
          className="h-[78px] w-[100%] bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${user?.banner})` }}
        />
        <div className="mx-[29px] flex flex-col">
          <img
            src={user?.avatar}
            alt="avatar"
            className="absolute top-[50px] w-[58px] h-[58px] rounded-[29px]"
          />
          <div className="mt-[30px]">
            <div className="text-lg font-bold hover:underline cursor-pointer">
              {user?.nickname}
            </div>
            <div className="cursor-pointer text-[var(--FG-7)] leading-4">
              @{user?.username}
            </div>
            <div className="my-[12px] break-words">
              {user?.description}
            </div>
          </div>
        </div>
      </>}
    </div>
  );
};
