import "./App.css";
import WebSocketClient from "./websocketclinet/WebSocket";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./page/LoginPage";
import SignUp from "./page/SignUp";
import Cash from "./page/CashPage";

function App() {
  const [webSocketClinet, setWebSocketClient] = useState(null);

  useEffect(() => {
    const client = new WebSocketClient("ws://your-websocket-server-url");

    client.onConnected(() => {
      console.log("Connected to WebSocket server");
    });

    client.onDisconnected(() => {
      console.log("Disconnected from WebSocket server");
    });

    client.onMessage((message) => {
      console.log("Received message:", message);
    });

    client.onError((error) => {
      console.error("WebSocket error:", error);
    });

    client.connect();
    setWebSocketClient(client);

    return () => {
      client.disconnect();
    };
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LogIn websocketclinet={webSocketClinet} />}
          />
          <Route
            path="/signup"
            element={<SignUp websocketclinet={webSocketClinet} />}
          />
          <Route
            path="/cash"
            element={<Cash websocketclinet={webSocketClinet} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
