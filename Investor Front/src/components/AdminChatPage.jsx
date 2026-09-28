import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";

export default function AdminChatPage() {
  const [waitingList, setWaitingList] = useState([]);
  const [activeInvestor, setActiveInvestor] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      debug: (str) => console.log("[STOMP DEBUG - Admin]", str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Admin STOMP connected (plain)");
        setIsConnected(true);
        client.subscribe("/topic/admin", (msg) => {
          console.log("📩 Admin Message received:", msg.body);
          try {
            const parsedMsg = JSON.parse(msg.body);
            setChatMessages((prev) => [...prev, parsedMsg]);
            endRef.current?.scrollIntoView({ behavior: "smooth" });
          } catch (err) {
            console.error("Error parsing admin message:", err);
          }
        });
      },
      onStompError: (frame) => {
        console.error("❌ Admin STOMP error", frame);
      },
    });
    client.activate();
    clientRef.current = client;
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8080/waiting-list")
        .then((res) => res.json())
        .then((data) => {
          console.log("📋 Waiting list:", data);
          setWaitingList(data);
        })
        .catch((err) => console.error("Error fetching waiting list:", err));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const acceptChat = (investor) => {
    if (!clientRef.current || !isConnected) {
      console.error("STOMP client not connected. Cannot accept chat.");
      alert("Connection lost. Please refresh the page.");
      return;
    }
    setActiveInvestor(investor);
    const welcomeMsg = {
      sender: "admin",
      recipient: investor,
      content: "✅ Admin has joined the chat. How can I help you?",
      timestamp: new Date().toISOString(),
    };
    try {
      clientRef.current.publish({
        destination: "/app/send",
        body: JSON.stringify(welcomeMsg),
        headers: { "content-type": "application/json" },
      });
    } catch (err) {
      console.error("Error sending welcome message:", err);
    }
    fetch(`http://localhost:8080/clear-user?username=${investor}`, { method: "POST" })
      .then(() => console.log("Investor removed from waiting list"))
      .catch((err) => console.error("Error clearing user:", err));
  };
  const sendMessage = () => {
    if (!chatInput.trim() || !activeInvestor) return;
    if (!clientRef.current || !isConnected) {
      console.error("STOMP client not connected. Cannot send message.");
      alert("Connection lost. Please refresh the page.");
      return;
    }
    const chatMsg = {
      sender: "admin",
      recipient: activeInvestor,
      content: chatInput,
      timestamp: new Date().toISOString(),
    };
    try {
      clientRef.current.publish({
        destination: "/app/send",
        body: JSON.stringify(chatMsg),
        headers: { "content-type": "application/json" },
      });
      setChatMessages((prev) => [...prev, chatMsg]);
      setChatInput("");
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const closeChat = () => {
    if (clientRef.current && isConnected && activeInvestor) {
      const leaveMsg = {
        sender: "admin",
        recipient: activeInvestor,
        content: "❌ Admin has left the chat. Please refresh the page to chat again.",
        timestamp: new Date().toISOString(),
      };
      try {
        clientRef.current.publish({
          destination: "/app/send",
          body: JSON.stringify(leaveMsg),
          headers: { "content-type": "application/json" },
        });
      } catch (error) {
        console.error("Error sending leave message:", error);
      }
    }
    setActiveInvestor(null);
    setChatMessages([]);
  };

  return (
    <div className="admin-chat-container">
      <h2>Admin Help Center</h2>
      {!activeInvestor && (
        <div className="waiting-list">
          <h3>Waiting Investors</h3>
          {waitingList.length === 0 ? (
            <p>No investors waiting.</p>
          ) : (
            waitingList.map((investor) => (
              <div
                key={investor}
                className="waiting-investor"
                onClick={() => acceptChat(investor)}
              >
                <div className="investor-info">
                  <strong>{investor}</strong>
                </div>
                <button className="accept-btn">Accept</button>
              </div>
            ))
          )}
        </div>
      )}
      {activeInvestor && (
        <div className="chat-container-left">
          <div className="chat-window">
            <div className="chat-header">
              <span>Chat with {activeInvestor}</span>
              <button className="close-btn" onClick={closeChat}>
                ×
              </button>
            </div>
            <div className="chat-messages">
              {chatMessages.map((msg, i) => {
                const messageClass = msg.sender === "admin" ? "sent" : "received";
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
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}