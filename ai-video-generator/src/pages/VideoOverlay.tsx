import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

type Props = {
  videoUrl: string; // dummy video URL
  onClose: () => void;
};

export default function VideoOverlay({ videoUrl, onClose }: Props) {
  const { id } = useParams();

  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        px: 2,
      }}
    >
      <Typography variant="h5">Video ID: {id}</Typography>
      <video
        src={videoUrl}
        controls
        autoPlay
        loop
        style={{
          width: "80%",
          maxWidth: 800,
          borderRadius: 12,
        }}
      />
      <Button
        onClick={onClose}
        variant="contained"
        sx={{
          bgcolor: "#444",
          "&:hover": { bgcolor: "#666" },
          mt: 2,
        }}
      >
        Back
      </Button>
    </Box>
  );
}
