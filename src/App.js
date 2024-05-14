import "./App.css";
import WebSocketClient from "./WebSocketClient/WebSocketClient.js";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./page/LoginPage";
import SignUp from "./page/SignUp";
import Cash from "./page/CashPage";

function App() {
  const [webSocketClient, setWebSocketClient] = useState(null);

  useEffect(() => {
    const client = new WebSocketClient("ws://localhost");

    client.addEventListener("connected", () => {
      console.log("Connected to WebSocket server");
    });

    client.addEventListener("disconnected", () => {
      console.log("Disconnected from WebSocket server");
    });

    client.addEventListener("message", (message) => {
      console.log("Received message:", message);
    });

    client.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    client.connect();
    setWebSocketClient(client);

    return () => {
      client.disconnect();
    };
  }, []);
  if (webSocketClient === null)
    return;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LogIn webSocketClient={webSocketClient} />}
          />
          <Route
            path="/signup"
            element={<SignUp webSocketClient={webSocketClient} />}
          />
          <Route
            path="/cash"
            element={<Cash webSocketClient={webSocketClient} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
