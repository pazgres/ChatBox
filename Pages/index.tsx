// pages/chat.tsx
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Supaya ChatBox tidak dirender di server
const ChatBox = dynamic(() => import("../components/ChatBox"), { ssr: false });

export default function ChatPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Contoh user yang sudah login (dummy), bisa diubah dengan real auth
    setUser({ username: "anon" });
  }, []);

  if (!user) return <p className="text-center p-10">Loading user...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center py-4">Global Chat</h1>
      <ChatBox user={user} />
    </div>
  );
}
