import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Example overlay route (requirement #6): open overlay via URL */}
      <Route path="/video/:id" element={<Home />} />
    </Routes>
  );
}
