import { DirectMessage, User } from "@/types";

export default function ActiveUser({
  user,
  handleSelectedUser,
}: {
  user: User;
  handleSelectedUser: (user: User) => void;
}) {
  return (
    <div
      onClick={() => handleSelectedUser(user)}
      className="w-full bg-slate-600 text-white text-lg rounded-lg px-3 py-2 flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-500 transition ease-in-out duration-500"
    >
      <div className="flex flex-row items-center justify-center gap-3">
        <div className="w-10 h-10 bg-stone-500 rounded-full flex items-center justify-center">
          {user.userName[0].toUpperCase()}
        </div>
        <div>{user.userName}</div>
        {user.hasNewMessages && (
          <div className="text-green-500 text-sm">New Messages</div>
        )}
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <div className="text-sm">online</div>
      </div>
    </div>
  );
}
