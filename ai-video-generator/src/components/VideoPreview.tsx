import { Box, Typography, IconButton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Video } from "../api/videoApi";

interface VideoPreviewProps {
  video: Video;
}

export default function VideoPreview({ video }: VideoPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set video duration
    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.currentTime >= video.duration) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    videoRef.current?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      videoRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [video.duration]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        border: "2px solid #333",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
      onClick={handleVideoClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={video.url}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "cover",
          aspectRatio: "16 / 9",
          maxHeight: "66vh",
        }}
        playsInline
      />

      {/* Play button overlay - only visible when not hovered */}
      <IconButton
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255,255,255,0.9)",
          color: "#000",
          width: 64,
          height: 64,
          opacity: isHovered ? 0 : 1,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        }}
      >
        <PlayArrow sx={{ fontSize: 32 }} />
      </IconButton>

      {/* Description below video */}
      <Box sx={{ mt: 2, backgroundColor: "#1A1A1A", borderRadius: 2, p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {video.prompt}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          {video.duration}s · {video.resolution}p · {video.modelName}
        </Typography>
      </Box>
    </Box>
  );
}
