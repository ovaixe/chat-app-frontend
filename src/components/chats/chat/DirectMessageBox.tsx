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
      className={`max-w-[80%] flex flex-row p-2 gap-3  rounded-xl max-w-fit animate-popOut ${
        message.fromSelf
          ? "place-self-end bg-green-800"
          : "place-self-start bg-slate-800"
      }`}
    >
      <div className="">{message.content}</div>
      <div className="flex items-end justify-end text-stone-400 text-sm">
        {message.timeSent.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  );
}
