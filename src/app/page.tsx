import StartChat from "@/components/home/StartChat";

export default function Home() {
  return (
    <div className="mt-10 flex flex-col justify-center items-center space-y-10">
      <div className="text-bold text-lg text-green-500 text-center bg-gradient-to-r from-stone-500 to-stone-950 rounded-2xl py-2 px-5">
        Hello From Chat App
      </div>
      <StartChat />
    </div>
  );
}
