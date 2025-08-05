import HomePage from "./pages/HomePage.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/login.jsx"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home/:userId" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
