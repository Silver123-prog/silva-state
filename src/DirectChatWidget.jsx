import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connects to your running Node.js backend on port 5000
const socket = io.connect("http://localhost:5000");

export default function DirectChatWidget({ listingId, currentUser, realtorName }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (listingId) {
      socket.emit("join_room", listingId);
    }

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, [listingId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const messageData = {
      listingId,
      senderId: currentUser?.id || 'guest',
      senderName: currentUser?.name || 'Interested Buyer',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    socket.emit("send_message", messageData);
    setMessages((prev) => [...prev, messageData]);
    setInputMessage("");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
      <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
        <h4 className="text-xs font-bold text-amber-400">Direct Chat with {realtorName || 'Realtor'}</h4>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
        </span>
      </div>

      <div className="h-48 overflow-y-auto space-y-2 text-xs pr-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.senderId === (currentUser?.id || 'guest') ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-xl ${
                msg.senderId === (currentUser?.id || 'guest')
                  ? 'bg-amber-500 text-slate-950 font-medium'
                  : 'bg-slate-950 text-slate-200 border border-slate-800'
              }`}
            >
              <p>{msg.text}</p>
            </div>
            <span className="text-[9px] text-slate-500 mt-0.5">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2 pt-2 border-t border-slate-800">
        <input
          type="text"
          placeholder="Message realtor directly..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
        />
        <button
          type="submit"
          className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs hover:bg-amber-400 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}