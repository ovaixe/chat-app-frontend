import { DirectMessage } from "@/types";
import useAuth from "@/hooks/useAuth";

export default function DirectMessageBox({
  message,
}: {
  message: DirectMessage;
}) {
  const { user } = useAuth() ?? {};
  message.timeSent = new Date(message.timeSent);
  return (
    <div
      className={`zmax-w-[80%] min-w-[23%] flex flex-col p-2 gap-0  rounded-xl animate-popOut ${
        message.fromSelf
          ? "place-self-end bg-green-800"
          : "place-self-start bg-slate-800"
      }`}
    >
      <div className="">{message.content}</div>
      <div className="flex items-end justify-end text-stone-400 text-sm whitespace-nowrap">
        {message.timeSent.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  );
}
