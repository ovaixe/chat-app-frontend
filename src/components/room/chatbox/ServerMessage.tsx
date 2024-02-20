export default function ServerMessage(props: {
  userName: string;
  message: string;
  timeSent: Date;
}) {
  let { userName, message, timeSent } = props;
  timeSent = new Date(timeSent);

  return (
    <div className="my-2 place-self-center px-2 rounded-lg flex flex-row justify-center space-x-10 bg-stone-950">
      <div className="text-white">{message}</div>
      <div className="text-white">
        {timeSent.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  );
}
