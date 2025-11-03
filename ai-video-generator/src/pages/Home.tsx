import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import UploadImage from "../components/UploadImage";
import ParameterForm, { type ModelParams } from "../components/ParameterForm";
import PromptInput from "../components/PromptInput";
import VideoPreview from "../components/VideoPreview";

export default function Home() {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState<ModelParams>({
    model: "Veo 3.1",
    duration: 6,
    resolution: 720,
    audio: true,
  });

  const handleGenerate = async (promptText: string) => {
    if (!referenceImage) return alert("Upload a reference image first.");
    if (!promptText.trim()) return alert("Enter a prompt.");

    setIsLoading(true);
    setVideoUrl(null);

    try {
      const payload = {
        model: params.model,
        referenceImage,
        duration: params.duration,
        resolution: params.resolution,
        audio: params.audio,
        prompt: promptText,
      };

      const res = await fetch("http://localhost:5000/api/video-generation/v1/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const first = data?.videos?.[0];
      if (first?.url) setVideoUrl(first.url);
      else alert("Failed to generate video.");
    } catch (e) {
      console.error(e);
      alert("Error generating video.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {/* LEFT PANEL */}
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 3,
                bgcolor: "#141414",
                borderRadius: "12px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                color: "#e5e5e5",
              }}
              elevation={2}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Parameters
              </Typography>
              <ParameterForm params={params} onChange={setParams} />
              <Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Reference Image
                </Typography>
                <UploadImage onUpload={setReferenceImage} image={referenceImage} />
              </Box>
            </Paper>
          </Grid>

          {/* RIGHT PANEL */}
          <Grid item xs={12} md={9}>
            <Paper
              sx={{
                p: 3,
                bgcolor: "#141414",
                borderRadius: "12px",
                color: "#e5e5e5",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                minHeight: "80vh",
              }}
              elevation={2}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  mb: 1,
                }}
              >
                Toy Video Generator
              </Typography>

              {/* Video Section */}
              <Box
                sx={{
                  position: "relative",
                  flex: 1,
                  bgcolor: "#000",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <VideoPreview
                  videoUrl={videoUrl}
                  isLoading={isLoading}
                  referenceImage={referenceImage}
                />
                {isLoading && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      bgcolor: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <CircularProgress color="inherit" />
                  </Box>
                )}
              </Box>

              {/* Prompt input */}
              <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
