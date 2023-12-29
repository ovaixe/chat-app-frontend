import NewRoom from "../../components/chats/NewRoom";
import Header from "@/components/chats/Header";
import AllRooms from "@/components/chats/AllRooms";

export default function Chats() {
  return (
    <div className="flex flex-col justify-center items-center space-y-10 p-3">
      <Header />
      <div className="mt-10">
        <NewRoom />
      </div>
      <AllRooms />
    </div>
  );
}
