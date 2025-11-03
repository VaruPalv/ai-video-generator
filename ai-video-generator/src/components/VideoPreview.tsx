import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";

type Props = {
  videoUrl: string | null;
  referenceImage: string | null;
  isLoading: boolean;
};

export default function VideoPreview({ videoUrl, referenceImage }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => videoRef.current?.pause();

  return (
    <Box
      sx={{
        width: "100%",
        height: "60vh",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        bgcolor: "#000",
      }}
    >
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "0.3s ease-in-out",
          }}
        />
      ) : referenceImage ? (
        <img
          src={referenceImage}
          alt="Reference"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#888",
          }}
        >
          Your generated video will appear here
        </Typography>
      )}
    </Box>
  );
}
