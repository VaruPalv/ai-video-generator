import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import VideoOverlay from "../pages/VideoOverlay";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoOverlay />} />
      </Routes>
    </BrowserRouter>
  );
}
