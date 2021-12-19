import {useState} from "react";
import Home from "pages/Home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import Pricing from "pages/Pricing/Pricing";
import Admin from "pages/Admin/Admin";

function App() {
  const [token,setToken] = useState()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login token={token} setToken={setToken}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/admin/users" element={<Admin token={token}/>} />
      </Routes>
    </Router>
  );
}

export default App;
