export default function Message(props: {
  userName: string;
  message: string;
  timeSent: Date;
}) {
  let { userName, message, timeSent } = props;
  timeSent = new Date(timeSent);

  return (
    <div className="flex flex-col p-3 space-y-2 bg-slate-800 rounded-2xl max-w-fit">
      <div className="flex flex-row space-x-3 justify-between">
        <div className="flex flex-row justify-center items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-green-300 text-stone-800 text-center text-bold text-sm">
            {userName[0].toUpperCase()}
          </div>
          <div className="text-sm text-green-500">{userName}</div>
        </div>
        <div className="flex justify-end text-stone-400 text-sm">
          {timeSent.getHours()}:{timeSent.getMinutes()}
        </div>
      </div>
      <div className="text-sm text-white text-bold">{message}</div>
    </div>
  );
}
