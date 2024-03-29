import useAuth from "@/hooks/useAuth";

export default function Message(props: {
  userName: string;
  message: string;
  timeSent: Date;
}) {
  const { user } = useAuth() ?? {};
  let { userName, message, timeSent } = props;
  timeSent = new Date(timeSent);

  return (
    <div
      className={`max-w-[80%] flex flex-col ${
        user?.userName === userName ? "place-self-end" : "place-self-start"
      } p-2 space-y-2 bg-slate-800 rounded-xl max-w-fit animate-popOut`}
    >
      <div className="flex flex-row space-x-3 justify-between">
        <div className="flex flex-row justify-center items-center space-x-2">
          <div
            className={`w-5 h-5 rounded-full ${
              user?.userName === userName ? "bg-green-500" : "bg-yellow-500"
            } text-stone-800 text-center text-bold text-sm`}
          >
            {userName[0].toUpperCase()}
          </div>
          <div
            className={`text-sm ${
              user?.userName === userName ? "text-green-500" : "text-yellow-500"
            }`}
          >
            {user?.userName === userName ? "You" : userName}
          </div>
        </div>
        <div className="flex justify-end text-stone-400 text-sm">
          {timeSent.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      </div>
      <div className="text-sm text-white text-bold">{message}</div>
    </div>
  );
}
