"use client";

export default function StartChatButton(props: {
  text: string;
  handleStartChat: () => void;
  startButton: boolean;
}) {
  const { text, handleStartChat, startButton } = props;
  return (
    <button
      onClick={handleStartChat}
      disabled={!startButton}
      className={`text-bold text-lg text-white text-center ${
        startButton ? "bg-green-500" : "bg-gray-400"
      } rounded-2xl p-3`}
    >
      {text}
    </button>
  );
}
