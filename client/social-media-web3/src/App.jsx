import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import MyPosts from "./pages/MyPosts/MyPosts";
import Register from "./pages/Register/Register";
import Polls from "./pages/Polls/Polls";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
