import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
// We'll define .sent and .received in ChatStyles.css

export default function InvestorChatBox({ username, onClose }) {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      debug: (str) => console.log("[STOMP DEBUG]", str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ WebSocket connected (Investor)");
        setIsConnected(true);
        client.subscribe(`/topic/${username}`, (msg) => {
          const parsedMsg = JSON.parse(msg.body);
          setMessages((prev) => [...prev, parsedMsg]);
          endRef.current?.scrollIntoView({ behavior: "smooth" });
        });
        const waitingPayload = { username, userType: "investor" };
        client.publish({
          destination: "/app/waiting",
          body: JSON.stringify(waitingPayload),
          headers: { "content-type": "application/json" },
        });
      },
      onStompError: (frame) => {
        console.error("❌ STOMP error", frame);
      },
    });
    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [username]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (!chatInput.trim() || !clientRef.current || !isConnected) return;
    const chatMsg = {
      sender: username,
      recipient: "admin",
      content: chatInput,
      timestamp: new Date().toISOString(),
    };
    clientRef.current.publish({
      destination: "/app/send",
      body: JSON.stringify(chatMsg),
    });
    setMessages((prev) => [...prev, chatMsg]);
    setChatInput("");
  };
 
  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>Your help box!!!</span>
        {onClose && (
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        )}
      </div>
      <div className="chat-messages">
        {messages.map((msg, i) => {
          const messageClass = msg.sender === username ? "sent" : "received";
          return (
            <div key={i} className={`message ${messageClass}`}>
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
      <div className="chat-input">
      <textarea
              rows={2}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message (Enter to send, Shift+Enter for newline)"
            />
        <button onClick={sendMessage} disabled={!isConnected}>
          Send
        </button>
      </div>
    </div>
  );
}