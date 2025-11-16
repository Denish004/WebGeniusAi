import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./ChatPage.css";

const ChatsPage = () => {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeChat, setActiveChat] = useState(null);

  // Sample chats for landlords and tenants
  const sampleChats = [
    { id: 1, name: "John - Landlord", role: "landlord", lastMessage: "Property available next month" },
    { id: 2, name: "Sarah - Tenant", role: "tenant", lastMessage: "When can I schedule a visit?" },
    { id: 3, name: "Mike - Landlord", role: "landlord", lastMessage: "Maintenance scheduled for Friday" },
    { id: 4, name: "Emma - Tenant", role: "tenant", lastMessage: "Thank you for the quick response" },
  ];

  const [chats, setChats] = useState(sampleChats);

  // Sample messages for the active chat
  useEffect(() => {
    if (activeChat) {
      setMessages([
        { id: 1, sender: "them", text: "Hello! I'm interested in the property.", time: "10:30 AM" },
        { id: 2, sender: "me", text: "Hi! Great to hear from you. Which property are you interested in?", time: "10:32 AM" },
        { id: 3, sender: "them", text: "The 2BHK apartment in downtown.", time: "10:35 AM" },
        { id: 4, sender: "me", text: "Perfect! When would you like to schedule a visit?", time: "10:36 AM" },
      ]);
    }
  }, [activeChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeChat) {
      const newMsg = {
        id: messages.length + 1,
        sender: "me",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      {/* Chat List Sidebar */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">
          <h2>Messages</h2>
          <p className="user-info">{user?.username || "User"}</p>
        </div>
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="chat-avatar">
                {chat.role === 'landlord' ? '🏠' : '👤'}
              </div>
              <div className="chat-info">
                <h4>{chat.name}</h4>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {activeChat ? (
          <>
            <div className="chat-header">
              <div className="chat-header-info">
                <h3>{activeChat.name}</h3>
                <span className="status">● Online</span>
              </div>
            </div>

            <div className="messages-container">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <div className="message-content">
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <form className="message-input-container" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <h3>Select a chat to start messaging</h3>
            <p>Connect with landlords and tenants</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
