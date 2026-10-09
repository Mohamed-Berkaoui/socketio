import axios from "axios";
import { useEffect, useState } from "react";

function ChatRoom({ name, onLeave }) {
  const [messages, setMessages] = useState([]);
  useEffect(function () {
    axios
      .get("http://localhost:3000/api/messages")
      .then((res) => setMessages(res.data.data))
      .catch((e) => alert(e.message));
  }, []);
  return (
    <main className="chat-page">
      <header className="chat-header">
        <div>
          <p className="eyebrow">Live room</p>
          <h1>Chat room</h1>
        </div>
        <div className="user-actions">
          <span className="user-badge" aria-label={`Signed in as ${name}`}>
            <span className="avatar" aria-hidden="true">
              {name.charAt(0)}
            </span>
            {name}
          </span>
          <button className="leave-button" type="button" onClick={onLeave}>
            Leave
          </button>
        </div>
      </header>
      <section className="chat-shell" aria-label="Chat messages">
        <div className="chat-status">
          <span className="status-dot" aria-hidden="true" />
          You are in the room, {name}.
        </div>
        <div className="message-list">
          {!messages.length ? (
            <div className="empty-chat">
              <h2>No messages yet</h2>
              <p>Messages will appear here when the conversation begins.</p>
            </div>
          ) : (
            messages.map((message, index) =>
              message.user == name ? (
                <div
                  key={message._id ?? message.id ?? index}
                  className="message message-outgoing"
                >
                  <p>{message.message}</p>
                </div>
              ) : (
                <div
                  key={message._id ?? message.id ?? index}
                  className="message message-incoming"
                >
                  <span className="message-author">{message.user}</span>
                  <p>{message.message}</p>
                </div>
              ),
            )
          )}
        </div>
        <form
          className="message-form"
          onSubmit={(event) => {event.preventDefault()
            const newmessage={message:event.target.message.value,user:name}
            event.target.message.value=""
            axios.post('http://localhost:3000/api/messages',newmessage)
            .then(res=>setMessages([...messages,newmessage]))
          }}
        >
          <label className="sr-only" htmlFor="message">
            Write a message
          </label>
          <input
            id="message"
            className="text-input"
            type="text"
            placeholder="Write a message..."
          />
          <button
            className="primary-button"
            type="submit"
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
}

export default ChatRoom;
