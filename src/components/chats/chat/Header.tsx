import { User } from "@/types";
import { IoIosArrowBack } from "react-icons/io";

export default function Header({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User,
  setSelectedUser: (user: User | null) => void;
}) {
  return (
    <div className="sticky top-0 flex flex-row items-center p-2 bg-slate-500 gap-5">
      <IoIosArrowBack
        onClick={() => setSelectedUser(null)}
        className="text-lg cursor-pointer"
      />
      <div className="flex flex-row items-center gap-3">
        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
          {selectedUser.userName[0].toUpperCase()}
        </div>
        <div className="text-lg">{selectedUser.userName}</div>
      </div>
    </div>
  );
}
