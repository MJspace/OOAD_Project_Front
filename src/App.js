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
  const [loginName, setLoginName] = useState(null);
  const [selectedTime, setSelectedTime] = useState(0); // 선택된 시간 상태 추가
  const [additionalTime, setAdditionalTime] = useState(0); //추가 시간 선택 상태
  // 로그인 페이지 (LogIn 컴포넌트): 사용자 이름을 입력하고, setLoginName 함수를 호출하여 loginName 상태를 업데이트
  // 다른 페이지들: 이후에도 loginName 상태를 사용하여 사용자 이름을 화면에 표시하거나 다른 로직에 사용 가능

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

  //따라서 useEffect 내부에 정의할 필요 없이, 이벤트 리스너에서 직접 호출하도록
  const handleMessage = (message) => {
    if (message.type === "control" && message.data.command === "reboot") {
      // 재부팅 메시지 처리
      alert("재부팅 중...");
    } else if (message.type === "notice") {
      // 알림 메시지 처리
      alert(message.data.message);
    }
  };
  useEffect(() => {
    if (webSocketClient) {
      webSocketClient.addEventListener("message", handleMessage);
    }
  }, [webSocketClient]);

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
                loginName={loginName}
                setLoginName={setLoginName}
              />
              // setLoginName 함수를 props로 전달하여 사용자 이름을 업데이트하면, 이 업데이트된 이름은 다른 페이지에서도 사용가능
            }
          />
          <Route
            path="/signup"
            element={<SignUp webSocketClient={webSocketClient} />}
          />
          <Route
            path="/cash"
            element={
              <Cash
                webSocketClient={webSocketClient}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                webSocketClient={webSocketClient}
                loginName={loginName}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
