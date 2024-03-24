import NewRoom from "./NewRoom";
import AllRooms from "./AllRooms";

export default function RoomSection() {
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <NewRoom />
      <AllRooms />
    </div>
  );
}
