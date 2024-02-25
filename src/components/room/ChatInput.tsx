import { LuSendHorizonal } from "react-icons/lu";
import useChat from "@/hooks/useChat";

export default function ChatInput() {
  const { hanldeMessageChange, handleKeypress, message, sendMessage } =
    useChat() ?? {};
  return (
    <>
      <div className="px-2 py-2 w-full lg:w-[50%] md:w-full bg-gradient-to-r from-stone-500 to-stone-950 flex flex-row space-x-3 justify-between items-cneter place-self-center">
        <textarea
          rows={1}
          onChange={hanldeMessageChange}
          onKeyUp={handleKeypress}
          value={message}
          className="p-2.5 w-full rounded-lg text-white bg-slate-800 focus:outline-none"
        ></textarea>
        <button
          onClick={sendMessage}
          className="items-center inline-flex justify-center px-4 py-2 text-sm bg-green-400 rounded-lg disabled:bg-stone-400 disabled:text-gray-700 text-white"
          disabled={message?.trim() ? false : true}
        >
          <LuSendHorizonal className="text-2xl" />
        </button>
      </div>
    </>
  );
}
