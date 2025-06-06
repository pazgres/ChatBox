import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io();

export default function ChatBox({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    fetch("/api/messages").then(res => res.json()).then(setMessages);
    socket.on("new-message", msg => setMessages(prev => [...prev, msg]));
  }, []);

  const sendMessage = async () => {
    if (!input && !file) return;

    const formData = new FormData();
    formData.append("text", input);
    formData.append("user", user.username);
    if (file) formData.append("file", file);

    await fetch("/api/messages", {
      method: "POST",
      body: formData,
    });

    setInput("");
    setFile(null);
  };

  return (
    <div className="p-4 space-y-2">
      <div className="overflow-y-auto h-[70vh] space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className="bg-white/10 p-3 rounded-xl">
            <div><strong>@{msg.user}</strong></div>
            <div>{msg.text}</div>
            {msg.file && (
              <a href={msg.file} target="_blank" className="underline text-blue-300">📎 File</a>
            )}
            <div>
              <button onClick={() => {}}>❤️</button>
              <button onClick={() => {}}>😂</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <input
          className="flex-1 p-2 text-black rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message... (tag @user)"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={e => setFile(e.target.files[0])}
          className="hidden"
        />
        <button onClick={() => fileInputRef.current.click()}>📎</button>
        <button onClick={sendMessage} className="bg-blue-500 px-3 py-1 rounded">Send</button>
      </div>
    </div>
  );
}
import EmojiPicker from "./EmojiPicker";
