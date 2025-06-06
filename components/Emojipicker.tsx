// components/EmojiPicker.tsx
import { useState } from "react";

const emojis = ["😀", "😂", "😍", "😢", "👍", "🔥", "❤️", "🎉", "🤔", "🙏"];

export default function EmojiPicker({ onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="px-2">😊</button>
      {open && (
        <div className="absolute bottom-10 left-0 bg-white text-black p-2 rounded shadow grid grid-cols-5 gap-1 z-50">
          {emojis.map((emoji, i) => (
            <button
              key={i}
              onClick={() => {
                onSelect(emoji);
                setOpen(false);
              }}
              className="hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
              }
