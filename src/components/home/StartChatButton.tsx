"use client";

export default function StartChatButton(props: {
  handleStartChat: () => void;
  startButton: boolean;
}) {
  const { handleStartChat, startButton } = props;
  return (
    <button
      onClick={handleStartChat}
      className={`text-bold text-lg text-white text-center ${startButton ? 'bg-green-500' : 'bg-gray-400'} rounded-2xl p-3`}
    >
      Start New Chat
    </button>
  );
}
