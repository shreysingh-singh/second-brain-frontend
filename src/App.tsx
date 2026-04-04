import { DashBoard } from "./pages/Dashboard";
import { SigninPage } from "./ui/SigninPage";
import { SignUpPage } from "./ui/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
