// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import VideoOverlay from "../pages/VideoOverlay";

function VideoOverlayWrapper() {

  const navigate = useNavigate();

  // For now we’ll just simulate getting the video URL by ID
  const dummyVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";


  return (
    <VideoOverlay
      videoUrl={dummyVideoUrl}
      onClose={() => navigate("/")}
    />
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoOverlayWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}
