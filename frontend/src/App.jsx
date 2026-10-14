import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import Home from "./components/Home";
import {io} from "socket.io-client"
const socket = io("http://localhost:3000");

function App() {
  const [name, setName] = useState(localStorage.getItem("name") ?localStorage.getItem("name") :"");
socket.on("connect",()=>console.log('connected'))
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={name.length?<Navigate to="/chat" replace />:<HomeRoute name={name} setName={setName} />} />
        <Route
          path="/chat"
          element={<ChatRoute name={name} setName={setName} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomeRoute({ name, setName }) {
  const navigate = useNavigate();

  const handleNameSubmit = (event) => {
    event.preventDefault();
    const trimmedName = event.target.name.value.trim();
    localStorage.setItem("name", trimmedName);
    if (!trimmedName) return;

    setName(trimmedName);
    navigate("/chat");
  };

  return <Home name={name} setName={setName} onSubmit={handleNameSubmit} />;
}

function ChatRoute({ name, setName }) {
  const navigate = useNavigate();

  if (!name) {
    return <Navigate to="/" replace />;
  }

  const handleLeave = () => {
    setName("");
    localStorage.clear()
    navigate("/");
  };

  return <ChatRoom name={name} onLeave={handleLeave} />;
}

export default App;
