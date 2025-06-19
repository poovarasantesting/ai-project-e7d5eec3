import { PreLoginChat } from "@/components/PreLoginChat";

export default function PreLoginChatPage() {
  return (
    <div className="container mx-auto py-6 h-screen flex flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Welcome to our Chat App</h1>
        <p className="text-gray-500 mb-6">
          You can chat here without logging in. Try it out!
        </p>
        <PreLoginChat />
      </div>
    </div>
  );
}