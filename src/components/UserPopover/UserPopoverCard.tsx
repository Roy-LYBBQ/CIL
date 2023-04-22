import { UserInfo } from '../../data/interfaces/user';

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
      <div
        className="h-[78px] w-[100%] bg-center bg-no-repeat bg-"
        style={{ backgroundImage: `url(${user?.banner})` }}
      />
      <div className="absolute top-[50px] w-full">
        <img
          src={user?.avatar}
          alt="avatar"
          className="w-[58px] h-[58px] rounded-[29px] ml-[29px]"
        />
      </div>
    </div>
  );
};
