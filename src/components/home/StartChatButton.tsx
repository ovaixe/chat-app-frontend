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
        startButton ? "bg-green-500 transition duration-200 hover:scale-110" : "bg-gray-400"
      } rounded-lg px-2 py-1`}
    >
      {text}
    </button>
  );
}
