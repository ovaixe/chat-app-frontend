import React from "react";

export default function MenuBar({
  active,
  setActive,
}: {
  active: string;
  setActive: (value: string) => void;
}) {
  return (
    <div className="text-white text-lg w-full lg:w-[50%] bg-gradient-to-r from-stone-500 to-stone-950 fixed bottom-0 p-2">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => setActive("chats")}
          className={`w-[50%] flex items-center justify-center ${
            active === "chats" ? "bg-green-500" : "bg-slate-800"
          } rounded-lg p-1 cursor-pointer`}
        >
          Chats
        </div>
        <div
          onClick={() => setActive("rooms")}
          className={`w-[50%] flex items-center justify-center ${
            active === "rooms" ? "bg-green-500" : "bg-slate-800"
          } rounded-lg p-1 cursor-pointer`}
        >
          Rooms
        </div>
      </div>
    </div>
  );
}
