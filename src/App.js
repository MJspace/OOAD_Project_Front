import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./page/LoginPage";
import SignUp from "./page/SignUp";
import Cash from "./page/CashPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cash" element={<Cash />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
