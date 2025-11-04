import { useState, useEffect } from "react";
import { Container, Typography, Box, Alert } from "@mui/material";
import ParameterForm, { type ModelParameters } from "../components/ParameterForm";
import PromptInput from "../components/PromptInput";
import VideoPreview from "../components/VideoPreview";
import { generateVideo, type Video } from "../api/videoApi";

interface AppState {
  parameters: ModelParameters;
  referenceImage: string | null;
  generatedVideo: Video | null;
  prompt: string;
}

export default function Home() {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [parameters, setParameters] = useState<ModelParameters>({
    model: "Veo 3.1",
    duration: 6,
    resolution: 720,
    audio: true,
  });

  const [generatedVideo, setGeneratedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");

  const handleGenerate = async (prompt: string) => {
    if (!referenceImage) {
      setError("Please upload a reference image first");
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentPrompt(prompt);

    try {
      const response = await generateVideo({
        ...parameters,
        referenceImage,
        prompt,
      });

      if (response.videos.length > 0) {
        const video = response.videos[0];
        setGeneratedVideo(video);
        saveStateToHistory(video, prompt);
      }
    } catch (err) {
      setError("Failed to generate video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        const state: AppState = event.state;
        setParameters(state.parameters);
        setReferenceImage(state.referenceImage);
        setGeneratedVideo(state.generatedVideo);
        setCurrentPrompt(state.prompt);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const saveStateToHistory = (newVideo: Video, prompt: string) => {
    const state: AppState = {
      parameters,
      referenceImage,
      generatedVideo: newVideo,
      prompt,
    };
    const url = new URL(window.location.href);
    url.searchParams.set("state", Date.now().toString());
    window.history.pushState(state, "", url.toString());
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", flex: 1 }}>
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          display: "flex", 
          flexDirection: "column", 
          flex: 1,
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Box sx={{ 
          display: "flex", 
          gap: { xs: 2, sm: 2.5 }, 
          flex: 1,
          flexDirection: { xs: "column", md: "row" }
        }}>
          {/* Left sidebar fixed width */}
          <Box
            sx={{
              width: { xs: "100%", md: 320 },
              backgroundColor: "#1A1A1A",
              p: { xs: 2, sm: 2.5 },
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <ParameterForm
              onParametersChange={setParameters}
              onImageUpload={(url) => setReferenceImage(url)}
            />
          </Box>

          {/* Main content area */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2.5 }}>
            {generatedVideo ? (
              <Box
                sx={{
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <VideoPreview video={generatedVideo} />
              </Box>
            ) : (
              <Box
                sx={{
                  backgroundColor: "#1A1A1A",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: { xs: 300, sm: 400, md: 540 },
                  width: "100%"
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Your generated video will appear here
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                backgroundColor: "#1A1A1A",
                borderRadius: 1,
                p: 2.5,
              }}
            >
              <PromptInput onGenerate={handleGenerate} loading={loading} value={currentPrompt} />
            </Box>

              {loading && (
              <Box
                sx={{
                  textAlign: "center",
                  mt: 2.5,
                  p: 2.5,
                  bgcolor: "#1A1A1A",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h6"
                  color="text.secondary"
                  gutterBottom
                >
                  Generating your video...
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  This may take a few moments
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
