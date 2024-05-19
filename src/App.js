import "./App.css";
import WebSocketClient from "./WebSocketClient/WebSocketClient.js";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./page/LoginPage";
import SignUp from "./page/SignUp";
import Cash from "./page/CashPage";
import Home from "./page/HomePage.js";

function App() {
  const [webSocketClient, setWebSocketClient] = useState(null);
  const [userName, setUserName] = useState(null);
  // 로그인 페이지 (LogIn 컴포넌트): 사용자 이름을 입력하고, setUserName 함수를 호출하여 userName 상태를 업데이트
  // 다른 페이지들: 이후에도 userName 상태를 사용하여 사용자 이름을 화면에 표시하거나 다른 로직에 사용 가능

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
  if (webSocketClient === null) return;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LogIn
                webSocketClient={webSocketClient}
                userName={userName}
                setUserName={setUserName}
              />
              // setUserName 함수를 props로 전달하여 사용자 이름을 업데이트하면, 이 업데이트된 이름은 다른 페이지에서도 사용가능
            }
          />
          <Route
            path="/signup"
            element={<SignUp webSocketClient={webSocketClient} />}
          />
          <Route
            path="/cash"
            element={<Cash webSocketClient={webSocketClient} />}
          />
          <Route
            path="/home"
            element={
              <Home webSocketClient={webSocketClient} userName={userName} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
