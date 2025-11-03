import { useParams, useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, Paper } from "@mui/material";
import { Close, Download, Bookmark, Share } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function VideoOverlay() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState<any>(null);

  useEffect(() => {
    // In a real app, you'd fetch video data by ID
    // For now, use mock data
    setVideoData({
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      prompt: "A woman running around central park in the morning",
      duration: 7,
      resolution: 720,
      modelName: "Veo 3.1",
      createdAt: new Date().toISOString(),
    });
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  };

  if (!videoData) {
    return (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1300,
        }}
      >
        <Typography color="white">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0,0,0,0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "white",
          bgcolor: "rgba(255,255,255,0.1)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
        }}
      >
        <Close />
      </IconButton>

      {/* Video container */}
      <Box
        sx={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <video
          src={videoData.url}
          controls
          autoPlay
          style={{
            maxWidth: "100%",
            maxHeight: "70vh",
            borderRadius: 8,
          }}
        />

        {/* Video info */}
        <Paper
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "rgba(255,255,255,0.9)",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {videoData.prompt}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {videoData.duration}s · {videoData.resolution}p · {videoData.modelName}
          </Typography>

          {/* Action buttons */}
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <IconButton size="small" title="Download">
              <Download />
            </IconButton>
            <IconButton size="small" title="Bookmark">
              <Bookmark />
            </IconButton>
            <IconButton size="small" title="Share">
              <Share />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
