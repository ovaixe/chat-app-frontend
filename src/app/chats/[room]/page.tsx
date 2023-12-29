import ChatBox from "@/components/room/ChatBox";
import Header from "@/components/room/Header";

export default function Chat({ params }: { params: { room: string } }) {
  return (
    <div className="flex flex-col items-center space-y-3 justify-center h-screen pb-16 p-3">
      <Header />
      <ChatBox />
    </div>
  );
}
